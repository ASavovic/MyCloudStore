<?php

include_once 'lib.php';
$base=new CloudService();
$fajlovi=null;
if(isset($_POST["id"]))
{
  $fajlovi=$base->vratiFajlove($_POST["id"]);
 
}
echo json_encode($fajlovi);
?>
