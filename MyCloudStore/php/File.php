<?php
class File {
   public $id;
   public $fileName;
   public $fileContent;
   public $idUser;
   public $fileDate;
   public $fileSize;
   public $fileTime;

   
   
   function  __construct($id,$name,$content,$user,$date,$size,$time){
      
     $this->id=$id;
     $this->fileName=$name;
     $this->fileContent=$content;
     $this->idUser=$user;
     $this->fileDate=$date;
     $this->fileSize=$size;
     $this->fileTime=$time;

   }
   
}

