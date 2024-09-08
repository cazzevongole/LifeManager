importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAUO2lLzHHtYJ_IEkuLerKjb8HinI16RyU",
  authDomain: "life-manager-68747.firebaseapp.com",
  projectId: "life-manager-68747",
  storageBucket: "life-manager-68747.appspot.com",
  messagingSenderId: "267625436469",
  appId: "1:267625436469:web:c99dabcc101e0bef6f287c",
  measurementId: "G-C3XNM4GSMV"
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
