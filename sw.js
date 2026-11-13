
const prefix = 'manifesta:' + self.registration.scope + ':';
const name = prefix + "2b4ee812f2b8a36e";
const shell = new URL('./index.html', self.registration.scope);
const assets = ["./_expo/static/js/web/index-f4fce0679878c6140ea0dcbf3df9d977.js","./apple-touch-icon.png","./favicon.ico","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest","./metadata.json","./offline.js"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(name).then((cache) => cache.addAll(assets)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith(prefix) && key !== name).map((key) => caches.delete(key))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || !request.url.startsWith(self.registration.scope)) return;
  event.respondWith(caches.open(name).then(async (cache) => {
    if (request.mode === 'navigate') {
      return await cache.match(shell.href) || fetch(request);
    }
    return await cache.match(request) || fetch(request);
  }));
});
