const CACHE_NAME = "gustavo-v1"
const cache_url = ["/offline.html","/stilosOffline.css","/13123040_1079216795454091_5075010337969840034_o.jpg"]

self.addEventListener("install",function(ev){
    //console.log("sw instalado")

   caches.open(CACHE_NAME)
         .then(function(cache){
           // console.log("cache abierta")
            return cache.addAll([cache_url])
   })
})

self.addEventListener("fetch",function(ev){
   console.log(ev.request)
   
   ev.respondWith(
      caches.match(ev.request).then(function(response){
         if(response){
           // console.log("estoy en el cache")
            return response
         }
        // console.log("no estoy en el cache")
         return fetch(ev.request)
         
      })
   )
})