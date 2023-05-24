<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: *");

    require "./conexion.php";

    $json = file_get_contents("php://input");
    
    $objPersonas = json_decode($json);

    $sql = "INSERT INTO persona(nombre, apellido, direccion, telefono, email, pais, ciudad) VALUES ('$objPersonas->nombre', '$objPersonas->apellido', '$objPersonas->direccion', '$objPersonas->telefono','$objPersonas->email','$objPersonas->pais','$objPersonas->ciudad')";
    
    $query = $mysqli->query($sql);

    $jsonRespuesta = array('msg' => 'OK');
    echo json_encode($jsonRespuesta);


?>    
