
eventListeners();

function eventListeners() {
    // boton para crear proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

}
function nuevoProyecto(e){
    e.preventDefault();
    console.log('presionaste nuevo proyecto');
}