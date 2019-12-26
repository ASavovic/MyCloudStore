<?php

include_once 'lib.php';
$base=new CloudService();
$fajlovi=null;
if(isset($_POST["idFile"]))
{
  $base->obrisiFajl($_POST["idFile"]);
  $fajlovi=$base->vratiFajlove($_POST["idUser"]);
 
}
echo json_encode($fajlovi);
