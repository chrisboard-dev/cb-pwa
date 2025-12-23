const CACHE_NAME = "cb-pwa-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/logo/cblogo_t.svg",
  "./assets/bg/cbbackground.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/ios/apple-touch-icon-180.png",
  "./assets/ios/apple-touch-icon-167.png",
  "./assets/ios/apple-touch-icon-152.png",
  "./assets/ios/apple-touch-icon-120.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});