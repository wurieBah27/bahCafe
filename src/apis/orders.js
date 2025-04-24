import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebaseJS/firebaseConfig";
import convertTimestamp from "../utils/convertTimestamp"; // Import the utility function

export const createOrder = async (orderData) => {
  try {
    return await runTransaction(db, async (transaction) => {
      const docRef = doc(db, "OrderNumber", "0mk2wbpkeYrC6UwsAiJ4");

      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newPopulation = sfDoc.data().counterNumber + 1;
      transaction.update(docRef, { counterNumber: newPopulation });
      if (!Object.keys(orderData) || !newPopulation) return null;
      await addDoc(collection(db, "orders"), {
        ...orderData,
        order_number: `ORD-${newPopulation}`,
        order_id: newPopulation,
      });
      return newPopulation;
    });
  } catch (e) {
    console.log("Transaction failed: ", e);

    throw new Error(e);
  }
};

/* get all orders */
export const getAllOrders = async ({ uid }) => {
  try {
    const orders = [];
    const q = query(
      collection(db, "orders"), // Reference to 'orders' collection
      where("userId", "==", uid), // **Crucial: Filter by userId == current user's UID**
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      docData.createdAt = convertTimestamp(docData.createdAt); // Convert the timestamp
      docData.updated_at = convertTimestamp(docData.updated_at); // Convert the timestamp
      orders.push({ ...docData, id: doc.id });
    });

    return orders;
  } catch (e) {
    console.log("Error getting documents: ", e);
    throw new Error(e);
  }
};
