const PRECACHE='0.1.2'
const RUNTIME='runtime'

const PRECACHE_URL=['index.html','./']

self.addEventListener('install',e=>{
	e.waitUntil(
		caches.open(PRECACHE).then(cache=>cache.addAll(PRECACHE_URL))
	)
})

self.addEventListener('fetch',e=>{
	e.respondWith(
		caches.match(e.request).then(res=>{
			//return cache
			if(res){
				return res
			}

			// IMPORTANT: Clone the request. A request is a stream and
	        // can only be consumed once. Since we are consuming this
	        // once by cache and once by the browser for fetch, we need
	        // to clone the response.
	        var fetchRequest = e.request.clone();

			return fetch(fetchRequestt).then(response=>{
				 // Check if we received a valid response
	            if(!response || response.status !== 200 || response.type !== 'basic') {
	              return response;
	            }

	            // IMPORTANT: Clone the response. A response is a stream
	            // and because we want the browser to consume the response
	            // as well as the cache consuming the response, we need
	            // to clone it so we have two streams.
	            var responseToCache = response.clone();

	            caches.open(PRECACHE).then(cache=>{
	            	cache.put(e.request,responseToCache)
	            })

	            return e.response

			})
		})
	)
})

