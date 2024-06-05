import { initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBamF1ioX5wFg75hjNd3SVGW1X0aDoBsB0",
  authDomain: "lifemanager-7bc94.firebaseapp.com",
  projectId: "lifemanager-7bc94",
  storageBucket: "lifemanager-7bc94.appspot.com",
  messagingSenderId: "225455895010",
  appId: "1:225455895010:web:2dbd4a9b3ab77df08c49bb",
  measurementId: "G-3JSTW57W9F"
};

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);
export const setupNotifications = async () => {
  const response = {
    status: null,
    token: null,
  }

  try {
    // Request permission for notifications
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // Get the FCM token
      const token = await getToken(messaging);
      response.status = 'success';
      response.token = token;
    } else {
      response.status = 'denied';
    }
    // Handle foreground notifications
    onMessage(messaging, (payload) => {
      console.log('Foreground Message:', payload);
      // Handle the notification or update your UI
    });
  } catch (error) {
    console.error('Error setting up notifications:', error);
    response.status = 'error';
  }
  return response;
};