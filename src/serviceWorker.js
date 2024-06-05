export const register = () => {
  if ('serviceWorker' in navigator) {
    console.log('Registering service worker with scope: ', process.env.PUBLIC_URL);
    navigator.serviceWorker
      .register('firebase-messaging-sw.js', { scope: `${process.env.PUBLIC_URL}/` })
      .then((registration) => {
      })
      .catch((error) => {
        console.error('Error registering service worker:', error);
      });
  }
};