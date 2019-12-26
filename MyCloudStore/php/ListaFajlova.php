<?php

include_once 'File.php';

class ListaFajlova {
  public $fajlovi;
  
  function __construct() {
      $this->fajlovi=array();
  }
  public function dodajFajl(File $f){
      $this->fajlovi[]=$f;
  }
}