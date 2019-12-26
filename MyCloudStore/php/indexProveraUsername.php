<?php


include_once 'lib.php';
$baza=new CloudService();
$korisnici=$baza->vratiSveKorisnike();  
echo json_encode($korisnici);
?>
