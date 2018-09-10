function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

var vapidPublicKey = 'BHzLRRfRuTf4F3SpvI24Kjmz0wIvSXcBqHZ524CduiaH1Co-mh4Qp3dkRf16TzWPaFVp9KKtAJN8T8oY31rGc64';

function createNewSubscription() {
  var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
  return navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
    console.log('[app.js] New subscription');
    return serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidPublicKey
    });
  })
}

if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('[app.js] Service worker registered');
    });

  // Wait for the service worker to be active
  navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
    return serviceWorkerRegistration.pushManager.getSubscription();
  })
    .then(function (subscription) {
      if (subscription === null) {
        // Create a new subscription
        return createNewSubscription();
      } else {
        // We have a subscription
        return subscription;
      }
    })
    .then(function (subscription) {
      console.log(JSON.stringify(subscription));
    });

}
