<?php
class Korisnik {
   public $id;
   public $email;
   public $lozinka;
   
   function  __construct($id,$email,$lozinka)
   {
       $this->id=$id;
       $this->email=$email;
       $this->lozinka=$lozinka;
   }
}