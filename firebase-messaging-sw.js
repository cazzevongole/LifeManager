importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBamF1ioX5wFg75hjNd3SVGW1X0aDoBsB0",
  authDomain: "lifemanager-7bc94.firebaseapp.com",
  projectId: "lifemanager-7bc94",
  storageBucket: "lifemanager-7bc94.appspot.com",
  messagingSenderId: "225455895010",
  appId: "1:225455895010:web:2dbd4a9b3ab77df08c49bb",
  measurementId: "G-3JSTW57W9F",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// Customize background notification handling here
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
