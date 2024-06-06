export const register = () => {
  if ('serviceWorker' in navigator) {
    const files = [
      'firebase-messaging-sw.js',
      '/firebase-messaging-sw.js',
      'LifeManager/firebase-messaging-sw.js',
      '/LifeManager/firebase-messaging-sw.js',
      `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`,
      `${process.env.PUBLIC_URL}/LifeManager/firebase-messaging-sw.js`,
    ]
    const scopes = [
      '',
      '/',
      'LifeManager/',
      '/LifeManager/',
      `${process.env.PUBLIC_URL}/`,
      `${process.env.PUBLIC_URL}/LifeManager/`,
    ]

    files.forEach(file => {
      scopes.forEach(scope => {

        navigator.serviceWorker
          .register(file, { scope: scope })
          .then((registration) => {
            console.log('file:', file)
            console.log('scope:', scope)
            console.log('Service worker registration successful:', registration);
          })
          .catch((error) => {
            console.error('Error registering service worker:', error);
          });
      });
    });
  }
};