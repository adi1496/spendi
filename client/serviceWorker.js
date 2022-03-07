// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

// workbox.routing.registerRoute(
//     ({request}) => request.destination === 'image',
//     new workbox.strategies.NetworkFirst()
// )

const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    'index.html',
    'manifest.json',
    'css/style.css',
    'img/svg/icons.svg',
    'img/background.jpg',
    'img/logo.png',
    'img/user.png',
    'js-bundler/bundle.js',
    'js-bundler/bundle.js.map',
]

self.addEventListener('install', event => {
    console.log('install event');
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(resourcesToPrecache);
        })
    )
});

self.addEventListener('activate', event => {
    console.log("Activate event");
});

self.addEventListener('fetch', event => {
    // console.log('Fetch intercepted for: ', event.request.url);
    // event.respondWith(caches.match(event.request))
    // .then(cachedResponse => {
    //     return cachedResponse || fetch(event.request);
    // });
})