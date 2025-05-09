import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebaseJS/firebaseConfig";

export const getAllFavoritesItems = async ({ uid }) => {
  try {
    const q = collection(db, "Customers", uid, "favorites");

    const querySnapshot = await getDocs(q);
    const favoritesItems = [];

    querySnapshot.forEach((doc) => {
      favoritesItems.push({ ...doc.data(), id: doc.id });
    });
    return favoritesItems;
  } catch (error) {
    console.error("Error fetching favorite items: ", error);
    throw new Error("Error fetching favorite items");
  }
};

export const addToFavorites = async ({ uid, item }) => {
  try {
    const docRef = await setDoc(
      doc(db, `Customers/${uid}/favorites`, item?.id),
      item,
    );
    return null;
  } catch (error) {
    console.error("Error adding to favorites: ", error);
    throw new Error("Error adding to favorites");
  }
};

export const removeFromFavorites = async ({ uid, itemId }) => {
  try {
    if (!uid || !itemId) {
      throw new Error("User ID and item ID are required");
    }
    const docRef = await deleteDoc(
      doc(db, `Customers/${uid}/favorites`, itemId),
    );
    return null;
  } catch (error) {
    console.error("Error removing from favorites: ", error);
    throw new Error("Error removing from favorites");
  }
};
