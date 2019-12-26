<?php

include_once 'lib.php';
$baza=new CloudService();
$fajlovi=null;
if(isset($_POST["fileName"]))
{
    $t=time();
    $file= new File(0,$_POST["fileName"],$_POST["fileContent"],$_POST["idUser"],date("Y-m-d",$t),$_POST["fileSize"],$t);
    $baza->dodajFile($file);
    $FajlId=$baza->vratiidFajla($file);

   if(file_exists("../js/kljucevi.json"))
    {
        $currentData=file_get_contents('../js/kljucevi.json');
        $arrayData=json_decode($currentData,true);
        if($_POST["Algorithm"]=='0') 
            $pomK=$_POST["Key"] ;
        else $pomK=json_decode($_POST["Key"],true);
        $extra=array(
        'idFile'=> json_decode($FajlId),
        'Algorithm'=> $_POST["Algorithm"],
        'kljuc'=>$pomK );
        $arrayData[]=$extra;
        $finalData= json_encode($arrayData);
        file_put_contents('../js/kljucevi.json',$finalData);
        
       
    }
    $fajlovi=$baza->vratiFajlove($_POST["id"]);
    echo json_encode($fajlovi);
} 

    
