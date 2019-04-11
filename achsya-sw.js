self.addEventListener('install', function(event) {
    //akan dijalankan bila service worker sedang diinstall oleh sistem
    console.log('Service worker installing...');
    //pada bagian ini bisa ditambahkan script untuk perubahan pada serviceworker berjalan, self.skipwaiting
    //akan menambahkan listener pada website untuk mendengar event pada fetch yang terjadi pada website. 
    //nilai fetct yang didapat akan dimasukkan ke dalam console log
    self.addEventListener('fetch', function(event) {
        console.log('Fetching:', event.request.url);
        });
    //akan melakukan skip pada waiting service worker 
    self.skipWaiting();
    });
    self.addEventListener('activate', function(event) {
    //akan dijalankan bila service worker telah diaktifasi oleh sistem
    console.log('Service worker activating...');
    });