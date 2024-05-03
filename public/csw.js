// self.addEventListener('install', (e) => {
//     console.log("INSTALLED", e);
//     // Skip Waiting
//     self.skipWaiting()
// })
// self.addEventListener('activate', (e) => {
//     console.log("Worker Activated", e);
//     self.registration.showNotification("MAGIC", {
//         body: "Buzz! Buzz!",
//         icon: "https://static8.depositphotos.com/1012223/980/i/950/depositphotos_9803930-stock-photo-demo-cubes.jpg",
//         vibrate: [200, 100, 200, 100, 200, 100, 200],
//         tag: "vibration-sample",
//     });
//     setTimeout(() => {
//         self.registration.showNotification("BACKGROUND BABY!", {
//             body: "Buzz! Buzz!",
//             icon: "https://static8.depositphotos.com/1012223/980/i/950/depositphotos_9803930-stock-photo-demo-cubes.jpg",
//             vibrate: [200, 100, 200, 100, 200, 100, 200],
//             tag: "vibration-sample",
//         });
//     }, 5000);
// })


// import {io} from 'socket.io-client';
// console.log("OL", io)

self.addEventListener('install', (e) => {
    console.log("INSTALLED", e);
    // Skip Waiting
    self.skipWaiting()
})

const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    } 
    return outputArray
  }
 
self.addEventListener('activate', async(e) => {
    console.log("Worker Activated", e);
    try {
        const options = {userVisibleOnly: true, applicationServerKey: urlB64ToUint8Array(
            'BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8VjyqzbQKS8V7bUAglk'
          )}

        const subscription = await self.registration.pushManager.subscribe(options)
        console.log(JSON.stringify(subscription))
      } catch (err) {
        console.log('Error', err)
      }
    self.registration.showNotification("MAGIC", {
        body: "Buzz! Buzz!",
        icon: "https://static8.depositphotos.com/1012223/980/i/950/depositphotos_9803930-stock-photo-demo-cubes.jpg",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "vibration-sample",
    });

    setTimeout(() => {
        self.registration.showNotification("BACKGROUND BABY!", {
            body: "Buzz! Buzz!",
            icon: "https://static8.depositphotos.com/1012223/980/i/950/depositphotos_9803930-stock-photo-demo-cubes.jpg",
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "vibration-sample",
        }); 
    }, 5000);
})

self.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    self.registration.showNotification("BYE BYE", {
        body: "Buzz! Buzz!",
        icon: "https://static8.depositphotos.com/1012223/980/i/950/depositphotos_9803930-stock-photo-demo-cubes.jpg",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "vibration-sample",
    });
    return; // This will keep the service worker running
  });