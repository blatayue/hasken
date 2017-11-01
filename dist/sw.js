self.addEventListener('fetch', function(event) {
    if (event.request.url.includes(/.*(reddit.com|wunderground.com).+/)) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || 
                
                fetch(event.request)
                .then(function(response) {
                    return caches.open('cachesWutWut')
                    .then(function(cache) {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                })
            })
        );
    }
});