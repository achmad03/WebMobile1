var CACHE_NAME = 'static-cache';
   //digunakan untuk memberikan list berupa array untuk menyimpan direktory dan file apa saja yang akan disimpan ke dalam cache browser
   var urlsToCache = [
   '.',
   'index.html',
   'bootstrap/css/styles.css',
   'bootstrap/css/bootstrap.min.new.css',
   'bootstrap/js/jquery.min.js',
   'bootstrap/js/bootstrap.min.new.js',
   'foto.html',
   'galeri.html',
   'images/uiUx.png',
   'images/backEnd.png',
   'images/frontEnd.png',
   'images/admin.jpg',
   'images/wireless.png'


   ];
   //digunakan untuk memberikan listener saat terdapat sebuah event install pada browser lalu akan menambahkan semua cache yang dituliskan sebelumnya 
   //ke dalam cache browser
   self.addEventListener('install', function(event) {
   event.waitUntil(
   caches.open(CACHE_NAME)
   .then(function(cache) {
   return cache.addAll(urlsToCache);
   })
   );
   });
   
   //digunakan untuk memberikan listener saat terdapat event fetch pada browser maka akan dilakukan pengecekan apakah cache browser sesuai dengan cache dari server
   //bila sama maka akan menampilkan yang ada di cache. lalu bila cache tidak sama maka akan mengambil cache yang ada dalam server untuk disimpan pada browser
   //bila tidak ada koneksi internet maka akan membuka cache yang tersimpan pada cahe browser
   self.addEventListener('fetch', function(event) {
       event.respondWith(
           //untuk mencocokkan dengan html request apakah cache browser sama atau tidak dengan yang ada di server
       caches.match(event.request)
       .then(function(response) {
       return response || fetchAndCache(event.request);
       })
       );
       });
       function fetchAndCache(url) {
       return fetch(url)
       .then(function(response) {
       // Check if we received a valid response
       if (!response.ok) {
       throw Error(response.statusText);
       }
       //digunakan untuk membuat cache baru pada browser
       return caches.open(CACHE_NAME)
       .then(function(cache) {
           //akan menyalin cache yang dikirim dari server dengan susunan direktory dan file yang sesuai dengan yang ada di server
       cache.put(url, response.clone());
       return response;
       });
       })
       .catch(function(error) {
       console.log('Request failed:', error);
       // You could return a custom offline 404 page here
       });
       }