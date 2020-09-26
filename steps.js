"use strict"

;(function(){

    // $("#contact-form").on("submit",function(event){ // esto estuvo en un principio para probar el envio del formulario
    //   event.preventDefault()
    //   enviarFormulario($(this))
    //   return false
    // })


  // $(".step:nth-child(1)").addClass("active")

    const selector ="#contact-form"

    $(".step textarea").on("keydown",(event)=>{
      if(event.keyCode == 13){ //la tecla numero 13 es el enter
          ev.preventDefault()
          $(event.target).blur()// la funcion blur es la inversa de focus, le quita el foco y automaticamente llama a la clase change y continua con su recorrido

        }
    })
    
    //console.log($(".step.active").index())//esto es para saber si muestra el valor del primer circulo

    $(".path-step").on("click",(event)=>{

      let $currentCircle = $(event.target)

      $(".path-step.active").removeClass("active")
      $currentCircle.addClass("active")

      const posicion = $currentCircle.index(".path-step") + 1 
      //console.log($currentCircle.index(".path-step")) //el metodo index dice que numero de hermano eres en este caso de los path-step
      
     let step = $(".step:nth-child("+posicion+")") // seleccionamos el paso, pero a un hijo en especifico que es el que este en la posicion

      enfocarsiguienteIput(step)
    })

    $(selector).find(".input").on("change", (event)=>{ //selector trae el id=contact-form .find busca todo lo que tenga la clase input
                                            //y el metodo .on "change" le dice que sle avise cuando hay un cambio en esos lugares
       // console.log("cambie de valor") 
      const input = $(event.target) //nos indica el input o lo que fuera del html que realizo el cambio
       //console.log(el)
      const nextInput = input.parent().next(".step") // el metodo next nos devuelve cual es el que le sigue abajo en el html
        //console.log(nextInput)

      const isFormValid = esValidoFormulario()

      console.log(nextInput.length)
      if(!isFormValid && nextInput.length > 0){
        enfocarsiguienteIput(nextInput);
      }else{
        validarFormulario()
      }
       
        
        //console.log(esValidoFormulario()) //retorna true o false comprobando si esta validado
    })

    function validarFormulario(){
       if(esValidoFormulario()){
        enviarFormulario()
       }else{
        let $setInvalido = $(selector).find(".input:invalid").first().parent() // del id #contact-form busca los input :(pseudo selector) y buscamos el selector invalid, como puede haber muchos campos invalido buscamos el first primero y despues el padre 
        enfocarsiguienteIput($setInvalido)
       
       }
    }
    function esValidoFormulario(){
       return document.querySelector(selector).checkValidity()
    }
    function enfocarsiguienteIput($nextInput){
        $(".step.active").removeClass("active") //el.step que tenga la clase active se la va aquitar 
        $nextInput.addClass("active")
        $nextInput.find("input").focus() //va a buscar en la clase que venga
       // $nextInput.focus() //focus situa el cursor en el lugar que se predetermine en este caso el siguiente html

       //esto es para coordinar los circulos con la posicion del formulario
       const posicion = ($nextInput.index(".step")) + 1 

       $(".path-step.active").removeClass("active")

       $(".path-step:nth-child("+posicion+")").addClass("active")
      
    }

    
    function enviarFormulario(){
      const $form = $(selector)
      $.fn.formObject = function() {
          const form = {}
          $.each($(this).serializeArray(), (i, field) =>{
              form[field.name] = field.value || ""
          }) 
          return form
       }
       //console.log($form.formObject()) //se probo como envia el formulario con el ajax
      $.ajax({
          url: $form.attr("action"), //attr nos deja utilizar un atributo de la etiqueta en este caso action
          method:"POST",
          data: $form.formObject(),
          dataType: "json",
          success: function(){
            $form.slideUp()
            $("#info-contacto").html("Mensaje enviado, pronto me pondre en contacto contigo")
          } // esto funcionaria si no necesitaria el check, y la redireccion quizas en otro servicio
      })
      
  }

})()