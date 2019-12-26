<?php

include_once 'Korisnik.php';

class ListaKorisnika {
  public $korisnici;
  
  function __construct() {
      $this->korisnici=array();
  }
  public function dodajKorisnika(Korisnik $k){
      $this->korisnici[]=$k;
  }
}