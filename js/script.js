eventListeners();
//lista de proyectos
var listaProyectos = document.querySelector("ul#proyectos");

function eventListeners() {
  // boton para crear proyectos
  document
    .querySelector(".crear-proyecto a")
    .addEventListener("click", nuevoProyecto);

  // boton para crear nuevo proyecto
  document
    .querySelector(".nueva-tarea")
    .addEventListener("click", agregarTarea);
}

function nuevoProyecto(e) {
  e.preventDefault();
  //console.log('presionaste nuevo proyecto');

  //crea un input para el nombre del nuevo proyecto
  var nuevoProyecto = document.createElement("li");
  nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto" >';
  listaProyectos.appendChild(nuevoProyecto);

  //selccionar el id con el nuevo proyecto
  var inputNuevoProyecto = document.querySelector("#nuevo-proyecto");

  // al presionar enter, crear en nuevo proyecto
  inputNuevoProyecto.addEventListener("keypress", function (e) {
    let tecla = e.which || e.keycode;

    if (tecla === 13) {
      guardaProyectosDB(inputNuevoProyecto.value);
      listaProyectos.removeChild(nuevoProyecto);
    }
  });
}

function guardaProyectosDB(nombreProyecto) {
  // crear llamado ajax
  let xhr = new XMLHttpRequest();

  //enviar datos por formdate
  let datos = new FormData();
  datos.append("proyecto", nombreProyecto);
  datos.append("accion", "crear");

  // abrir la conexion
  xhr.open("POST", "inc/modelos/modelos-proyecto.php", true);

  // en la carga
  xhr.onload = function () {
    if (this.status === 200) {
      //obtener datos de la respuesta
      let respuesta = JSON.parse(xhr.responseText);
      let proyecto = respuesta.nombre_proyecto,
        id_proyecto = respuesta.id_insertado,
        tipo = respuesta.tipo,
        resultado = respuesta.respuesta;

      // comprobar la insercion
      if (resultado === "correcto") {
        //fue exitoso
        if (tipo == "crear") {
          //se creo un nuevo proyecto
          //inyectar en el html
          let nuevoProyecto = document.createElement("li");
          nuevoProyecto.innerHTML = `
                    <a href="index.php?id_proyecto=${id_proyecto}" id="${id_proyecto}">
                        ${proyecto}
                    </a>
                    `;
          //agregar al html
          listaProyectos.appendChild(nuevoProyecto);

          //enviar alerta
          swal({
            title: "Proyecto creado",
            text: "El proyecto: " + proyecto + " se creo correctamente",
            type: "success",
          }).then((resultado) => {
            //redireccionar a la nueva URL
            if (resultado.value) {
              window.location.href = "index.php?id_proyecto=" + id_proyecto;
            }
          });
        } else {
          //se actualizo o elimino
        }
      } else {
        //hubo un error
        swal({
          title: "Error",
          text: "Hubo un error",
          type: "error",
        });
      }
    }
  };

  //enviar el reques
  xhr.send(datos);
}

//agregar una nueva tarea al proyecto actuaL

function agregarTarea(e) {
  e.preventDefault();

  let nombreTarea = document.querySelector(".nombre-tarea").value;

  //validar que el campo tenga algo escrito

  if (nombreTarea === "") {
    swal({
      tittle: "Error",
      text: "Una tarea no puede ir vacia",
      type: "error",
    });
  } else {
    //la tarea tiene algo insertar PHP

    // crear el llamado a ajax
    var xhr = new XMLHttpRequest();

     // datos que se envian al servidor
     var datos = new FormData();
     datos.append('tarea', nombreTarea);
     datos.append('accion', 'crear');
     datos.append('id_proyecto', document.querySelector('#id_proyecto').value);

    // abrir la conexión.
    xhr.open('POST', 'inc/modelos/modelos-tareas.php', true);

     // retorno de datos
     xhr.onload = function(){
        if(this.status === 200) {
            var respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);

            //asignar valore
            let resultado = respuesta.respuesta,
                  tarea = respuesta.tarea,
                  id_insertado = respuesta.id_insertado,
                  tipo = respuesta.tipo;

            if(respuesta.respuesta === 'correcto'){
              //se agrego correctamente
              if(tipo === 'crear'){
                //lanzar alerta
                swal({
                  title: 'tarea creada',
                  text: 'la tarea: ' + tarea + ' fue creada correctamente', 
                  type: 'success'
              });
              // construir el template

              let nuevaTarea = document.createElement('li');

              //agregar el ID

              nuevaTarea.id = 'tarea:' + id_insertado;

              // agregr la clase de la tarea

              nuevaTarea.classList.add('tarea');

              //construir el html

              nuevaTarea.innerHTML = `
                <p>${tarea}</p>
                <div class="acciones">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-trash"></i>
                </div>
              `;

              // agregar el html
              let listado = document.querySelector('.listado-pendientes ul');
              listado.appendChild(nuevaTarea);

              //limpiar el formulario
              document.querySelector('.agregar-tarea').reset();

              }
            }else{
              //hubo un error
              
              swal({
                title: 'Error',
                text: 'Hubo un error',
                type: 'error'
            });
            }
        }
    }
        // Enviar la petición
        xhr.send(datos);

  }
}
