/*EventListener();

function EventListener() {
  document
    .querySelector("#formulario")
    .addEventListener("submit", validarRegistro);
}

function validarRegistro(e) {
  e.preventDefault();

  var usuario = document.querySelector("#usuario").value,
    password = document.querySelector("#password").value,
    tipo = document.querySelector("#tipo").value;

  //console.log(usuario + " " + password); // comprobacion de envio formulario

  if (usuario === "" || password === "") {
    // la validacion fallo
    Swal({
      type: "error",
      title: "error...",
      text: "Ambos campos son obligatorios!",
      //footer: '<a href="">Why do I have this issue?</a>'
    });
  } else {
    // ambos campos son correctos ejecutar ajax

    //datos que se envian al servidor
    var datos = new FormData();
    datos.append("usuario", usuario);
    datos.append("password", password);
    datos.append("accion", tipo);

    //console.log(...datos);

    //crear el llamado ajax
    var xhr = new XMLHttpRequest();

    // abrir la conexion
    xhr.open("POST", "inc/modelos/modelos-admin.php", true);

    //retorno de datos
    //console.log(datos);
    xhr.onload = function () {
      if (this.status === 200) {
        var respuesta =JSON.parse(xhr.responseText);

        console.log(respuesta);

        //si la respuesta es correcta
        if (respuesta.respuesta === 'correcto') {
          //si es un usuario nuevo
          if  (respuesta.tipo === "crear") {
            Swal.fire(
              "Usuario Creado!",
              "El usuario fue creado correctamente",
              "success"
            );
          }
        }  //else if(respuesta.tipo === 'login'){

          //}
           else {
            // hubo un error
            Swal.fire(
              "Error",
              "hubo un error",
              "error"
            );
          } 
      }
    }
    //enviar la peticion
    xhr.send(datos);
  }
}*/


eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}


function validarRegistro(e) {
    e.preventDefault();
    
    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;
        
        if(usuario === '' || password === ''){
            // la validación falló
            swal({
              type: 'error',
              title: 'Error!',
              text: 'Ambos campos son obligatorios!'
            })
        } else {
            // Ambos campos son correctos, mandar ejecutar Ajax
            
            // datos que se envian al servidor
            var datos = new FormData();
            datos.append('usuario', usuario);
            datos.append('password', password);
            datos.append('accion', tipo);
            
            // crear el llamado a ajax
            var xhr = new XMLHttpRequest();
            
            // abrir la conexión.
            xhr.open('POST', 'inc/modelos/modelo-admin.php', true);
            
            // retorno de datos
            xhr.onload = function(){
                if(this.status === 200) {
                    var respuesta = JSON.parse(xhr.responseText);
                    
                    console.log(respuesta);
                    // Si la respuesta es correcta
                    if(respuesta.respuesta === 'correcto') {
                        // si es un nuevo usuario
                        if(respuesta.tipo === 'crear') {
                            swal({
                                title: 'Usuario Creado',
                                text: 'El usuario se creó correctamente',
                                type: 'success'
                            });
                        } else if(respuesta.tipo === 'login'){
                            swal({
                                title: 'Login Correcto',
                                text: 'Presiona OK para abrir el dashboard',
                                type: 'success'
                            })
                            .then(resultado => {
                                if(resultado.value) {
                                    window.location.href = 'index.php';
                                }
                            })
                        }
                    } else {
                        // Hubo un error
                        swal({
                            title: 'Error',
                            text: 'Hubo un error',
                            type: 'error'
                        })
                    }
                }
            }
            
            // Enviar la petición
            xhr.send(datos);
            
        }
}
