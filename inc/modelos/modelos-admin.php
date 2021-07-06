<?php
//die(json_encode($_POST));

 $accion = $_POST['accion'];
 $password = $_POST['password'];
 $usuario = $_POST['usuario'];

 if($accion === 'crear'){
     // codigo para crear los administardores 

    //hashear password
     $opciones = array(
         'cost' => 12
     );
     $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

     $respuesta = array(
        'pass' => $hash_password
     );
    
    echo json_encode($respuesta);
 }

 if($accion === 'login'){
//     //escribir codigo que logee a los admin
//echo json_encode($_POST);
 }

 //echo json_encode($_POST);
 
?>