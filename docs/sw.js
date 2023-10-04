let CACHE_NAME  = "UTX120V-cache-v1";
let urlsToCache = [
    "https://td-shi.github.io/OfflineNotice/index.html",
    "https://td-shi.github.io/OfflineNotice/favicon.svg",
    "https://td-shi.github.io/OfflineNotice/css/common.css",
    "https://td-shi.github.io/OfflineNotice/js/gutil.js",
    "https://td-shi.github.io/OfflineNotice/img/search.svg",
    "https://td-shi.github.io/OfflineNotice/img/menu.svg",
    "https://td-shi.github.io/OfflineNotice/img/delete.svg",
    "https://unpkg.com/modern-css-reset/dist/reset.min.css",
    "https://unpkg.com/maquette@3.6.0/dist/maquette.umd.js"
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(
            function(cache){
                return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(
        function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
