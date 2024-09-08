export const register = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register("firebase-messaging-sw.js")
    if (registration) {
      console.log('Service worker registered:', registration)
    } else {
      console.error('Failed to register service worker')
    }
  }
}