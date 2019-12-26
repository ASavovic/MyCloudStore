<?php

include_once 'lib.php';
$baza=new CloudService();
$korisnik=null;
if(isset($_POST["username"]))
{
  
   $korisnik=$baza->vratiKorisnika($_POST["username"], md5($_POST["password"]));  
}
echo json_encode($korisnik);
?>