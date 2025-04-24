import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth, db, functions } from "./firebaseJS/firebaseConfig";
import uploadFile from "./uploadFile";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

const createNewUser = async (userObj = {}) => {
  try {
    const { data = {}, file, id } = userObj;

    if (!file) {
      return await setDoc(doc(db, "Customers", id), {
        ...data,
        createdAt: serverTimestamp(),
        profileUrl: data?.profileUrl || "",
      });
    }

    if (file) {
      const uploadPromise = uploadFile(file);
      const downloadURL = await uploadPromise;
      return await setDoc(doc(db, "Customers", id), {
        ...data,
        profileUrl: downloadURL,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (userObj) => {
  try {
    const { email, password, file, userDetails } = userObj;

    return createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const user = userCredential.user;
        await createNewUser({ id: user.uid, data: userDetails, file: file });

        await sendEmailVerification(user);

        return user;

        // ...
      },
    );
  } catch (error) {
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

export const getCurrentLoggedInUser = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          user.customer = idTokenResult.claims.customer || null;
        });

        resolve(user);
      } else {
        reject("No user logged in");
      }
    });
  });
};

/* get single employee */

export const getCurrentLoggedInUse = async ({ id }) => {
  try {
    const docRef = doc(db, "Customers", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data();

    return {};
  } catch (error) {
    throw new Error(error?.message);
  }
};

/* sign in user */
export const signInUser = async ({ email, password }) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const errorMessage = error.message;
    throw new Error({ errorMessage });
  }
};

/* signout user  */

export const signOutUser = async () => {
  try {
    signOut(auth);

    return null;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

/* update user  address */

export const updateUserData = async ({ userObj, id }) => {
  try {
    await setDoc(doc(db, "Customers", id), userObj);
    return null;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/* log in with google */

export const signupWithGoogle = async () => {
  // const {  userDetails } = userObj;

  try {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider).then(async (result) => {
      const tttew = provider.setCustomParameters({
        isustomer: true,
      });
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      const userDetails = {
        email: user?.email || "",
        name: user?.displayName || "",
        phone: "",
        dateOfBirth: "",
        address: {
          position: "",
          city: "",
          county: "",
          country: "",
          formatted: "",
          town: "",
          continent: "",
        },
        profileUrl: user?.photoURL || "",
        createdAt: serverTimestamp(),
        orderHistory: [],
      };

      await createNewUser({ id: user.uid, data: userDetails });

      // IdP data available using getAdditionalUserInfo(result)
      // ...

      return user;
    });
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    return { errorCode, errorMessage, email, credential };
    // ...
  }
};
export const loginInWithGoogle = async () => {
  // const {  userDetails } = userObj;

  try {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider).then(async (result) => {
      const setIscustomerClaim = provider.setCustomParameters({
        isustomer: true,
      });
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      return user;
    });
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    return { errorCode, errorMessage, email, credential };
    // ...
  }
};
