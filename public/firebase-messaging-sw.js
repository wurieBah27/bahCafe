importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

// const firebaseConfig = {
//   apiKey: "AIzaSyBI6CBG1jHAcxwEeTzRpun6WWFwg5wQ6dg",
//   authDomain: "cafe-management-website.firebaseapp.com",
//   projectId: "cafe-management-website",
//   storageBucket: "cafe-management-website.firebasestorage.app",
//   messagingSenderId: "60197197886",
//   appId: "1:60197197886:web:b43a33e560a1c1265d196f",
//   measurementId: "G-65QBFTCVGJ",
// };

const messagingSenderId = "60197197886";

firebase.initializeApp({
  messagingSenderId: messagingSenderId,
});

// firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(payload);

  const title = payload.notification.title;

  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(title, notificationOptions);
});
