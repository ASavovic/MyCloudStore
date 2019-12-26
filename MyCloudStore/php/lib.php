<?php
include_once 'Korisnik.php';
include_once 'File.php';
include_once 'icloudservice.php';
include_once 'ListaKorisnika.php';
include_once 'ListaFajlova.php';
class CloudService implements ICloudService
{
    const db_host="localhost";
    const db_username="root";
    const db_password="";
    const db_name="mycloudstore";
     public function dodajKorisnika(Korisnik $k) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
       
        $res=$con->query("INSERT INTO KORISNIK (email, lozinka) VALUES ('$k->email', '$k->lozinka')");
        if ($res) {
            
        print("Dobro je proslo");
            
        }
        else
        {
            print ("Query failed");
        }
    }
    }

    public function vratiKorisnika($username, $password) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from KORISNIK where email='$username' and lozinka='$password'");
        if ($res) {
            $korisnik = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$korisnik=new Korisnik($row['id'],$row['email'],$row['lozinka']) ;

            }
            // zatvaranje objekta koji cuva rezultat
            
            return $korisnik;
        }
        else
        {
            print ("Query failed");
        }
    }
    
    }
    public function vratiSveKorisnike() {
   $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from KORISNIK");
        if ($res) {
            $niz = new ListaKorisnika();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$korisnik=new Korisnik($row['id'],$row['email'],$row['lozinka']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		$niz->dodajKorisnika($korisnik);

            }
            // zatvaranje objekta koji cuva rezultat
            //$res->close();
            return $niz;
        }
        else
        {
            print ("Query failed");
        }
    }

}

public function dodajFile($file)
{   $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
       
        $res=$con->query("INSERT INTO fajlovi (fileName, fileContent, idUser, fileDate, fileSize, fileTime) VALUES ('$file->fileName', '$file->fileContent', '$file->idUser','$file->fileDate','$file->fileSize','$file->fileTime')");
        if ($res) {
            
        
            
        }
        else
        {
            print ("Query failed");
        }
    }}
public function vratiFajlove($id)
{
       $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from FAJLOVI where idUser=$id");
        if ($res) {
            $niz = new ListaFajlova();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$fajl=new File($row['id'],$row['fileName'],$row['fileContent'],$row['idUser'],$row['fileDate'],$row['fileSize'],$row['fileTime']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		$niz->dodajFajl($fajl);

            }
            // zatvaranje objekta koji cuva rezultat
            //$res->close();
            return $niz;
        }
        else
        {
            print ("Query failed");
        }
    }

}
public function obrisiFajl($id)
{
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
       
        $res=$con->query("DELETE FROM FAJLOVI where id='$id'");
        if ($res) {
            
        
        }
        else
        {
            print ("Query failed");
        }
    }
}
public function vratiidFajla($file) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from FAJLOVI where fileName='$file->fileName' and fileContent='$file->fileContent'and idUser='$file->idUser' and fileDate='$file->fileDate' and fileTime='$file->fileTime'");
        if ($res) {
            $fajlID = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$fajlID=$row['id'] ;

            }
            // zatvaranje objekta koji cuva rezultat
            
            return $fajlID;
        }
        else
        {
            print ("Query failed");
        }
    }
    
    }
}