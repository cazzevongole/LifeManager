export const register = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(`/firebase-messaging-sw.js`, { scope: `${process.env.PUBLIC_URL}/` })
      .then((registration) => {
      })
      .catch((error) => {
        console.error('Error registering service worker:', error);
      });
  }
};