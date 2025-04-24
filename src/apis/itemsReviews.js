import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebaseJS/firebaseConfig";

export const createReview = async ({ data }) => {
  try {
    if (!Object.keys(data)) return null;

    await addDoc(collection(db, "ProductReviews"), data);

    return null;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getItemReviews = async ({ id }) => {
  try {
    const q = query(
      collection(db, "ProductReviews"),
      where("menuItemId", "==", id),
      orderBy("createdAt", "desc"),
    );
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot?.forEach((doc) => {
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
