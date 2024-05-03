self.addEventListener('install', (e) => {
    console.log("INSTALLED", e);
    // Skip Waiting
    self.skipWaiting()
})
self.addEventListener('activate', (e) => {
    console.log("Worker Activated", e);
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