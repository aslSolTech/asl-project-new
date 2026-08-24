//  service worker for push notification
self.addEventListener('push', function (event) {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body,
    icon: '/logo/logo.png',
    badge: '/logo/logo.png',
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});