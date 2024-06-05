export const register = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
      .then((registration) => {
      })
      .catch((error) => {
        console.error('Error registering service worker:', error);
      });
  }
};