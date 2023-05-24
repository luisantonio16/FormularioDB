<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: *");

    require "conexion.php";

    $json = file_get_contents("php://input");

    $objPersonas = json_decode($json);

    $sql = "UPDATE persona SET nombre='$objPersonas->nombre',
     apellido='$objPersonas->apellido',
      direccion='$objPersonas->direccion' , 
       telefono='$objPersonas->telefono',
        email='$objPersonas->email',
        pais='$objPersonas->pais',
         ciudad='$objPersonas->ciudad'
    WHERE id='$objPersonas->id'";
    
    $query = $mysqli->query($sql);

    $jsonRespuesta = array('msg' => 'OK');
    echo json_encode($jsonRespuesta);
?>