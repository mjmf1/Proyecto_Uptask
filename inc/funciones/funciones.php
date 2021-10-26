<?php
// obtiene la pag actual que se ejecuta 

function obtenerPaginaActual()
{
    $archivo = basename($_SERVER['PHP_SELF']);
    $pagina = str_replace(".php", "", $archivo);
    return $pagina;
}

// consultas 

// obtener todos los proyectos 
function obtenerProyectos()
{
    include 'conexion.php';
    try {
        return $conn->query('SELECT id, nombre FROM proyectos');
    } catch (exception $e) {
        echo "Error! : " . $e->getMessage();
        return false;
    }
}
// obtener el nombre del proyecto

function obtenerNombreProyecto($id = null)
{
    include 'conexion.php';
    try {
        return $conn->query("SELECT  nombre FROM proyectos WHERE id = {$id} ");
    } catch (exception $e) {
        echo "Error! : " . $e->getMessage();
        return false;
    }
}
