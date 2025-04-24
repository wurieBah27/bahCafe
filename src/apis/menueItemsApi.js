import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebaseJS/firebaseConfig";

export const getAllMenueItems = async ({ queryValue }) => {
  try {
    let data = [];
    let q;
    const menueRef = collection(db, "Products");
    /* conditionally applying the queries */
    if (queryValue === "all") {
      q = query(menueRef, orderBy("createdAt", "desc"));
    } else {
      q = query(menueRef, where("category", "==", queryValue));
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (docData.createdAt instanceof Timestamp) {
        docData.createdAt = docData.createdAt.toDate();
      }

      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/* get single item */

export const getSingleMenueItem = async ({ id }) => {
  try {
    const docRef = doc(db, "Products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No document found with this ID");
      return {};
    }
  } catch (error) {
    throw new Error(error);
  }
};
