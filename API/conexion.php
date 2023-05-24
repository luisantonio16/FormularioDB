<?php
   // Variables de la conexion a la DB
   $mysqli = new mysqli("localhost","id20802832_root","Melenciano.1629","id20802832_crudpracticafinal");
    
   // Comprobamos la conexion
   if($mysqli->connect_errno) {
       die("Fallo la conexion");
   } else {
       //echo "Conexion exitosa";
   }


?>
