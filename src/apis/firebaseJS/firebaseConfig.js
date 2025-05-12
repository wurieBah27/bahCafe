// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging"; // This is for initializing in your main app code
import { requestPermission } from "../../helpers/getNotificationPermission";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cafe-management-website.firebaseapp.com",
  projectId: "cafe-management-website",
  storageBucket: "cafe-management-website.firebasestorage.app",
  messagingSenderId: "60197197886",
  appId: "1:60197197886:web:b43a33e560a1c1265d196f",
  measurementId: "G-65QBFTCVGJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// const auth = getAuth()
export const storage = getStorage(app);
/* auth */
export const auth = getAuth(app);
export const functions = getFunctions(app);
//npm install -g firebase-tools\\
const messaging = async () => (await isSupported()) && getMessaging(app);

export const saveMessagingDeviceToken = async (uid) => {
  try {
    if (!uid) return;
    const msg = await messaging();
    const fcmToken = await getToken(msg, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });
    if (fcmToken) {
      const tokenRef = doc(db, `Customers/${uid}/fcmTokens`, uid);
      await setDoc(tokenRef, { fcmToken });

      onMessage(msg, (message) => {
        console.log(message.notification);

        new Notification(message.notification.title, {
          body: message.notification.body,
        });
      });
    } else {
      requestPermission(uid);
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Import the Firebase Admin SDK and Cloud Functions library
// const admin = require('firebase-admin');
// const functions = require('firebase-functions');

// // Initialize the Firebase Admin SDK (important for accessing Firestore and Messaging)
// // This is typically done once in your functions index file
// admin.initializeApp();

// // Get references to Firestore and Messaging services
// const db = admin.firestore();
// const messaging = admin.messaging();

// // Cloud Function to send an FCM notification when a new order is created
// // Triggers whenever a new document is added to `Customers/{userId}/orders/{orderId}`
// exports.sendOrderNotification = functions.firestore
//   .document('Customers/{userId}/orders/{orderId}')
//   .onCreate(async (snapshot, context) => {

//     // Get the user ID and order ID from the document path
//     const userId = context.params.userId;
//     const orderId = context.params.orderId;

//     // Get the data from the newly created order document
//     const orderData = snapshot.data();

//     // Log the event for debugging
//     functions.logger.info(`New order created for user ${userId} with ID ${orderId}`, orderData);

//     // --- Step 1: Get the user's FCM token ---
//     // The token is stored in Customers/{userId}/fcmTokens/{userId}
//     const tokenDocRef = db.collection('Customers').doc(userId).collection('fcmTokens').doc(userId);
//     const tokenDoc = await tokenDocRef.get();

//     // Check if the token document exists and has a token field
//     if (!tokenDoc.exists) {
//       functions.logger.warn(`FCM token document not found for user ${userId}. Cannot send notification.`);
//       return null; // Exit the function gracefully
//     }

//     const fcmToken = tokenDoc.data().token; // Assuming the token is stored in a field called 'token'

//     if (!fcmToken) {
//       functions.logger.warn(`FCM token field is empty for user ${userId}. Cannot send notification.`);
//       // Optionally, you might want to delete the token document if it's empty
//       // await tokenDocRef.delete();
//       return null; // Exit the function
//     }

//     // --- Step 2: Craft the FCM message payload ---
//     const payload = {
//       notification: {
//         title: '🎉 Order Placed Successfully!',
//         body: `Your order #${orderId} has been confirmed. Tap here for details!`,
//         // icon: orderData.itemImageUrl || '/images/default_order_icon.png', // Use an image from the order or a default
//         // You can add more notification options like sound, badge, etc.
//       },
//       data: {
//         // Optional: Send custom data to your app, e.g., the order ID
//         orderId: orderId,
//         click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com/orders/${orderId}` // Link to the order details page
//         // Make sure the click_action URL matches a route in your web app
//       }
//     };

//     // --- Step 3: Send the FCM message to the specific token ---
//     try {
//       // Send the message to the specific device token
//       const response = await messaging.send({
//           token: fcmToken,
//           notification: payload.notification,
//           data: payload.data, // Use the 'data' field in the send method options
//           // Add other message options like apns, android, webpush if needed
//           webpush: { // Optional: Webpush specific options
//             fcmOptions: {
//               link: payload.data.click_action // Ensure the link is also in webpush options for some clients
//             }
//           }
//       });

//       // Response is a message ID string.
//       functions.logger.log('Successfully sent message to', userId, ':', response);

//     } catch (error) {
//       functions.logger.error('Error sending message to', userId, ':', error);

//       // --- Step 4: Handle invalid tokens (similar to the codelab cleanup logic) ---
//       // If the error indicates the token is no longer valid, delete it from Firestore
//       if (error.code === 'messaging/invalid-argument' ||
//           error.code === 'messaging/registration-token-not-registered') {
//         functions.logger.warn(`Invalid or unregistered FCM token for user ${userId}. Deleting token document.`);
//         try {
//             await tokenDocRef.delete(); // Delete the invalid token from Firestore
//             functions.logger.log(`Deleted invalid token document for user ${userId}.`);
//         } catch (deleteError) {
//             functions.logger.error(`Error deleting invalid token document for user ${userId}:`, deleteError);
//         }
//       }
//        // You might handle other specific messaging errors here as needed
//     }

//     // Return null or a promise to indicate completion
//     return null;
//   });
