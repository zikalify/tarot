/* Sola Busca Tarot PWA — service worker */
const CACHE = "solabusca-v1";

const PRECACHE = [
  ".",
  "index.html",
  "manifest.webmanifest",
  "css/styles.css",
  "js/cards.js",
  "js/app.js",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/cards/00.jpg",
  "assets/cards/01.jpg",
  "assets/cards/02.jpg",
  "assets/cards/03.jpg",
  "assets/cards/04.jpg",
  "assets/cards/05.jpg",
  "assets/cards/06.jpg",
  "assets/cards/07.jpg",
  "assets/cards/08.jpg",
  "assets/cards/09.jpg",
  "assets/cards/10.jpg",
  "assets/cards/11.jpg",
  "assets/cards/12.jpg",
  "assets/cards/13.jpg",
  "assets/cards/14.jpg",
  "assets/cards/15.jpg",
  "assets/cards/16.jpg",
  "assets/cards/17.jpg",
  "assets/cards/18.jpg",
  "assets/cards/19.jpg",
  "assets/cards/20.jpg",
  "assets/cards/21.jpg",
  "assets/cards/22.jpg",
  "assets/cards/23.jpg",
  "assets/cards/24.jpg",
  "assets/cards/25.jpg",
  "assets/cards/26.jpg",
  "assets/cards/27.jpg",
  "assets/cards/28.jpg",
  "assets/cards/29.jpg",
  "assets/cards/30.jpg",
  "assets/cards/31.jpg",
  "assets/cards/32.jpg",
  "assets/cards/33.jpg",
  "assets/cards/34.jpg",
  "assets/cards/35.jpg",
  "assets/cards/36.jpg",
  "assets/cards/37.jpg",
  "assets/cards/38.jpg",
  "assets/cards/39.jpg",
  "assets/cards/40.jpg",
  "assets/cards/41.jpg",
  "assets/cards/42.jpg",
  "assets/cards/43.jpg",
  "assets/cards/44.jpg",
  "assets/cards/45.jpg",
  "assets/cards/46.jpg",
  "assets/cards/47.jpg",
  "assets/cards/48.jpg",
  "assets/cards/49.jpg",
  "assets/cards/50.jpg",
  "assets/cards/51.jpg",
  "assets/cards/52.jpg",
  "assets/cards/53.jpg",
  "assets/cards/54.jpg",
  "assets/cards/55.jpg",
  "assets/cards/56.jpg",
  "assets/cards/57.jpg",
  "assets/cards/58.jpg",
  "assets/cards/59.jpg",
  "assets/cards/60.jpg",
  "assets/cards/61.jpg",
  "assets/cards/62.jpg",
  "assets/cards/63.jpg",
  "assets/cards/64.jpg",
  "assets/cards/65.jpg",
  "assets/cards/66.jpg",
  "assets/cards/67.jpg",
  "assets/cards/68.jpg",
  "assets/cards/69.jpg",
  "assets/cards/70.jpg",
  "assets/cards/71.jpg",
  "assets/cards/72.jpg",
  "assets/cards/73.jpg",
  "assets/cards/74.jpg",
  "assets/cards/75.jpg",
  "assets/cards/76.jpg",
  "assets/cards/77.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        if (resp.ok && new URL(event.request.url).origin === location.origin) {
          const copy = resp.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return resp;
      });
    })
  );
});
