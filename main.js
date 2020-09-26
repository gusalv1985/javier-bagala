"use strict"
if(navigator.serviceWorker){//pregunta el navegador soporta serviceworker para ver offline
    //navigator.serviceWorker.register("/sw.js") // esto llama  al configuracion de sw pero se rompe todo por que no lo pude terminar
    // por que requiere de go y me dio paja por lo poco util
}

$("#btn-off").click(function(){
    $("video").prop('muted', true);
})
$("#btn-on").click(function(){
    $("video").prop('muted', false)
})


;(function(){
    
    let sticky = false
    let currentPosition = 0
    
    const contadorImag = (document.getElementsByClassName("image").length) - 1;
    let contadorImagenes = contadorImag - 1

    
   // $("#sticky-Navigation").removeClass("hidden")
    $("#sticky-Navigation").slideUp(0)

    checkScroll()
    //isOpen()
    
    $("#menu-opener").on("click", toogleNav)

    $(".menu-link").on("click", toogleNav)

    function toogleNav(){
        $("#responsive-nav ul").toggleClass("active") //toggleClass intercala la class, si la tiene se la quita y si no la tiene se la agrega
        $("#menu-opener").toggleClass("glyphicon-align-justify")
    }

    setInterval(()=>{

        currentPosition ++

        $("#galery .inner").css({
            left:"-"+currentPosition*100+"%"
        })

        if (currentPosition > contadorImagenes)  {
            currentPosition = 0 
        }

    },4000)

    //console.log($(window).height())

    $(window).scroll(checkScroll)

    function checkScroll(){
        // console.log($(window).scrollTop())
        // console.log( estaAbajo())
        const abajo = estaAbajo()

        if (abajo & !sticky) {
            //cambiar la navegacion a sticky
            //console.log("cambia la nav")
            sticky = true 
            stickNavigation()
        }
        if (!abajo & sticky) {
            //regresar la navegacion normal
            //console.log("regresa la nav")
            sticky = false
            unStickNavigation()
        }   
    }

    function stickNavigation(){
        $("#descripcion").addClass("fixed").removeClass("absolute")
        //$("#navigation").addClass("hidden")
        $("#navigation").slideUp(400)
        //$("#sticky-Navigation").removeClass("hidden")
        $("#sticky-Navigation").slideDown(400)
        $(".cambioP").text("Javier Bagala").addClass("google-fonts").addClass("medium")  
    }

    function unStickNavigation(){
        $("#descripcion").addClass("absolute").removeClass("fixed")
        //$("#navigation").removeClass("hidden")
        $("#navigation").slideDown(400)
        //$("#sticky-Navigation").addClass("hidden")
        $("#sticky-Navigation").slideUp(400)
        $(".cambioP").text("Causa y Efecto").removeClass("google-fonts").removeClass("medium")
    }


    function estaAbajo(){
        const $description = $("#descripcion")
        const descriptionHeight = $description.height()

        return $(window).scrollTop() > $(window).height() - (descriptionHeight*2)
    }

    // function isOpen(){ //para que cambie texto en funcion del tiempo
        
    //     let date = new Date()
    //     const currentHour = date.getHours()

    //     if(currentHour < 17 || currentHour >23 ){
    //         $("#is-open .text").html("cerrado ahora <br> Abierto 5pm")
    //     }
    // }

})()