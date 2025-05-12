import { saveMessagingDeviceToken } from "../apis/firebaseJS/firebaseConfig";

export const requestPermission = async (uid) => {
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("Notification permission granted.");
    saveMessagingDeviceToken(uid);
  }
};
