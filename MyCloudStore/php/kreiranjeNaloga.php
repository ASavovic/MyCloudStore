<?php
include_once 'lib.php';
$baza=new CloudService();
if(isset($_POST["email"]))
{
  
   $korisnik= new Korisnik(0,$_POST["email"], md5($_POST["password"]));
    
    $baza->dodajKorisnika($korisnik);
} 
