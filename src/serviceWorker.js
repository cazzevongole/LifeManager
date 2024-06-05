export const register = () => {
  if ('serviceWorker' in navigator) {
    console.log('Registering service worker with scope: ', process.env.PUBLIC_URL + '/LifeManager/');
    navigator.serviceWorker
      .register('LifeManager/firebase-messaging-sw.js', { scope: process.env.PUBLIC_URL + '/LifeManager/' })
      .then((registration) => {
      })
      .catch((error) => {
        console.error('Error registering service worker:', error);
      });
  }
};