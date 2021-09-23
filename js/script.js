
eventListeners();
//lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    // boton para crear proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

}
function nuevoProyecto(e){
    e.preventDefault();
    //console.log('presionaste nuevo proyecto');

    //crea un input para el nombre del nuevo proyecto
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto" >';
    listaProyectos.appendChild(nuevoProyecto);

    //selccionar el id con el nuevo proyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    // al presionar enter, crear en nuevo proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e) {
        let tecla = e.which || e.keycode ;

        if(tecla === 13){
            guardaProyectosDB(inputNuevoProyecto.value);
            listaProyectos.removeChild(nuevoProyecto);
        }
    });

}

function guardaProyectosDB(nombreProyecto){
    console.log(nombreProyecto);
}