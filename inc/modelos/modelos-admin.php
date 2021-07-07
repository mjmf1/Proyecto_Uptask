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

     //importar conexion 
     include '../funciones/conexion.php';

     try {
         //realizar la consulta  a la base de datos 
         $stmt = $conn->prepare("INSERT INTO usuarios (usuario, password) VALUES (?, ?) ");
         $stmt -> bind_param('ss', $usuario, $hash_password);
         $stmt ->  execute();
         if(0==1){
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                 'tipo' => $accion
                // mostrar errores 
               /* $stmt->error_list,
                'error' => $stmt->error*/
            );
         } else{
           $respuesta = array(
             'respuesta' => 'error'
           );
         }
        
         $stmt ->  close();
         $conn -> close();

     } catch (exception $e) {
         //en caso de error .. tomar la exepcion
         $respuesta = array(
            'pass' => $e->getMessage()
         );
     }

    echo json_encode($respuesta);
 }

 if($accion === 'login'){
//     //escribir codigo que logee a los admin

 }

 
?>