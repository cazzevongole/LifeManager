export const register = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`, { scope: "/" })
    if (registration) {
      console.log('Service worker registered:', registration)
    } else {
      console.error('Failed to register service worker')
    }
  }
}