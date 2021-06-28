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

           //console.log(datos.get('usuario'));

           //crear el llamado ajax
           var xhr = new XMLHttpRequest();

           // abrir la conexion
           xhr.open('POST', 'inc/modelos/modelos-admin.php', true);

           //retorno de datos
           xhr.onload= function(){ 
             if(this.status === 200){
               console.log(JSON.parse(xhr.responseText));
             }
           }
           //enviar la peticion
           xhr.send(datos);
        }

}