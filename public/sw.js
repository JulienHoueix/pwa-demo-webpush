var serviceWorkerVersion = 1;

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ' + serviceWorkerVersion, event);
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ' + serviceWorkerVersion, event);
  return self.clients.claim();
});

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Notification received', event);
  var options = {
    body: event.data.text()
  };
  event.waitUntil(
    self.registration.showNotification("Nouvelle notification", options)
  );
});
