const files = [
  `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`,
]
const scopes = [
  '/', // this is the one
]

// try to register the service worker with different files and scopes until it works.

// create a recursive function that will try to register the service worker with different files and scopes until it works.
// if it works, return the registration object.
// if it doesn't work, return null.

const registerServiceWorker = async (files, scopes, index = 0) => {
  if (index >= files.length) return null
  const file = files[index]
  const scope = scopes[index % scopes.length]
  try {
    const registration = await navigator.serviceWorker.register(file, { scope })
    console.log('Service worker registered with file:', file, 'and scope:', scope)
    return registration
  } catch (error) {
    console.error('Failed to register service worker with file:', file, 'and scope:', scope)
    return registerServiceWorker(files, scopes, index + 1)
  }
}

export const register = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await registerServiceWorker(files, scopes)
    if (registration) {
      console.log('Service worker registered:', registration)
    } else {
      console.error('Failed to register service worker')
    }
  }
}