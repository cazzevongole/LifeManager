import { initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAUO2lLzHHtYJ_IEkuLerKjb8HinI16RyU",
  authDomain: "life-manager-68747.firebaseapp.com",
  projectId: "life-manager-68747",
  storageBucket: "life-manager-68747.appspot.com",
  messagingSenderId: "267625436469",
  appId: "1:267625436469:web:c99dabcc101e0bef6f287c",
  measurementId: "G-C3XNM4GSMV"
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