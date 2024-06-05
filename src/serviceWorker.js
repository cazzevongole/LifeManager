export const register = () => {
  if ('serviceWorker' in navigator) {
    console.log('Registering service worker with scope: ', '/LifeManager/');
    navigator.serviceWorker
      .register('LifeManager/firebase-messaging-sw.js', { scope: '/LifeManager/' })
      .then((registration) => {
      })
      .catch((error) => {
        console.error('Error registering service worker:', error);
      });
  }
};