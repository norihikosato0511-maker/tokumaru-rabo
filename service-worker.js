const CACHE_NAME = "tokumaru-lab-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",

  "./favicon.png",
  "./logo.png",

  "./tokumaru-main.png",
  "./tokumaru-dev.png",
  "./tokumaru-study.png",
  "./tokumaru-wave.png",
  "./tokumaru-app.png",

  "./english-app.png",
  "./mahjong-app.png",
  "./translate-app.png",
  "./transcribe-app.png",
  "./lottery-app.png"
];

// インストール
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// リクエスト時
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// 古いキャッシュ削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});