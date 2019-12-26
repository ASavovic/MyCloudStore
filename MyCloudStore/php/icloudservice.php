<?php
interface ICloudService {
    //put your code here
    function dodajKorisnika(Korisnik $k);
    function vratiKorisnika($username, $password);
    function dodajFile($file);
    function vratiFajlove($id);
}