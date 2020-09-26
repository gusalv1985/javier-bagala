;(function(){

    class userLocation{
        static get(callback){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((location)=>{
                    callback({
                        lat: location.coords.latitude,
                        lng:location.coords.longitude
                    })
                })
            }else{
                alert("no pudimos detectar el lugar en el que te encuantras")
                return {
                    lat:0,
                    lng:0
                }
            }
        }
    }
    const myCoordenadas = {
        lat: -34.682763,
        lng: -58.467648
    }

    google.maps.event.addDomListener(window,"load",()=>{
        const maps = new google.maps.Map(document.getElementById("map"),
        {
            center: myCoordenadas,
            zoom: 15
        })//esto dibuja el mapa por javascript en el div con id map

        const marker =new google.maps.Marker({
            map : map,
            position :myCoordenadas,
            title: "javier bagala",
            visible: true
        })// para que aparezca el puntero rojo de localizacion

        userLocation.get((coords)=>{
            //alert("tengo las coordenadas")
            //console.log(coords)//para ver si toma bien las coordenadas

            //calculo d la locacion orignal al usuario que mira la pag
            let origen = new google.maps.LatLng(coords.lat,coords.lng) //donde viene
            let destino = new google.maps.LatLng(myCoordenadas.lat,myCoordenadas.lng)//donde va

           // let service = new google.maps.DistanceMatrixService()

            service.getDistanceMatrix({
                origins: [origen],
                destinations: [destino],
                travelMode: google.maps.TravelMode.DRIVING 
            },(response,status)=>{
                if(status === google.maps.DistanceMatrixService.OK){
                    const durationElement = response.rows[0].elements[0] //rows 0 es el primer origen y el elements 0 el primer destino si tuvieramos [origen, origen 1] pondriamos el rows en 1 para el otro origen
                    const duracionViaje = durationElement.duration.text
                   // console.log(durationElement) //nos muestra la distacia
                    document.querySelector("#message")
                            .innerHTML = `
                                Estas a ${duracionViaje} de una clase con <span class="google-font"> javier bagala </span>
                            `
                }           
            })
        })

    })

})()