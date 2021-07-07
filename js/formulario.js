EventListener();

function EventListener (){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();
    
    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;

        //console.log(usuario + " " + password); // comprobacion de envio formulario

        if(usuario === '' || password === ''){
          // la validacion fallo
            Swal({
                type: 'error',
                title: 'error...',
                text: 'Ambos campos son obligatorios!',
                //footer: '<a href="">Why do I have this issue?</a>'
              })
        }else{
           // ambos campos son correctos ejecutar ajax

           //datos que se envian al servidor
           var datos = new FormData();
           datos.append('usuario', usuario);
           datos.append('password', password);
           datos.append('accion', tipo);

           //console.log(...datos);

           //crear el llamado ajax
           var xhr = new XMLHttpRequest();

           // abrir la conexion
           xhr.open('POST', 'inc/modelos/modelos-admin.php', true);

           //retorno de datos
           //console.log(datos);
           xhr.onload= function(){ 
             if(this.status === 200){
               var respuesta = JSON.parse(xhr.responseText);

               //si la respuesta es correcta 
               if(respuesta.respuesta === 'correcto'){
                 //si es un usuario nuevo 
                 if(respuesta.tipo === 'crear'){
                  Swal.fire(
                    'Usuario Creado!',
                    'El usuario fue creado correctamente',
                    'success'
                  );

                   
                 }else{
                  Swal.fire(
                    'Usuario Creado!',
                    'El usuario fue creado correctamente',
                    'success'
                  );

                   //hubo un error
                   /*Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'hubo un error!',
                    type: 'error'
                    
                  });*/
                 }
               }

             }
           }
           //enviar la peticion
           xhr.send(datos);
        }

}