/*let korisnik =
{
    email:"",
    password:""
}*/
let users=[];
const dugme=document.querySelector("input[name='regButt']");
const elm=document.getElementById("alert");

dugme.onclick = (ev) => kreirajNalog();


function kreirajNalog()
{
    elm.innerHTML="";
    let prom=validacija();
    if(prom==0)
    {
     upozoriKlijenta();
     exit;
    }
    prom=validacijaOstatka();
    if(prom==0)
    {
        exit;
    }
    proveriPostojanjeKorisnika();
    
}


function validacija()
{
    let nizSifri=document.querySelectorAll("input[name='regL']");
    let ind=0;
    if( nizSifri[0].value==nizSifri[1].value )
        ind=1;
    return ind;
}


function upozoriKlijenta()
{
    let nizSifri=document.querySelectorAll("input[name='regL']");
    nizSifri.forEach(sifra =>
    {
       pocrveni(sifra);
    });
}


function validacijaOstatka()
{
    let ind=1;

   
    
    let sifre=document.querySelectorAll("input[name='regL']");
    const Email=document.getElementById("regE");
    korisnik.email=Email.value;
    korisnik.password=sifre[1].value;
    
    if(Email.value=="")
    {
        pocrveni(Email);
        ind=0;
    }
    if(sifre[0].value=="")
    {
        pocrveni(sifre[0]);
        ind=0;
    }
    if(sifre[1].value=="")
    {
        pocrveni(sifre[1]);
        ind=0;
        
    }
    return ind;
        
        
}


function pocrveni(el)
{
    el.value="";
    el.style.borderColor="red";
}



function preusmeri()
{
    window.open("../html/login.html","_self");
     // window.history.back();
}


function notifyKorisnik()
{
    let innerHtml="<div  class='alert alert-success' role='alert' >\n\
                  <strong>Well done!</strong>\n\
                   You have successfully created a medical account!<a href='logovanjeKorisnika.html' class='alert-link'> Go Back!\n\
                 </a>";
        
          elm.innerHTML=innerHtml;
          elm.style.visibility="inherit";
          elm.style.textAlign="center";
          setTimeout(preusmeri, 1000);
          let body=document.querySelectorAll("input");
          body.forEach(el => el.readOnly="true");
}
function proveriPostojanjeKorisnika()
{
    fetch("../php/indexProveraUsername.php")
            .then(response => 
            {
                
                    if(!response.ok)
                        throw new Error(response.statusText);
                    else
                        return response.json();
               
 
            }).then((korisnici) => 
               
                postojiKorisnik(korisnici)
            )
            .catch(error => console.log(error));
    
}
function postojiKorisnik(korisnici){
  
    users=korisnici;
    let indikator=1;
    let pom=users.korisnici.filter(x => x.email==korisnik.email);
    if(pom.length!=0)
        indikator=0;
   // return indikator;
   if(indikator==1)
   {
    elm.innerHTML="<div  class='alert alert-success' role='alert' >\n\
                  <strong>This</strong>\n\
                   may take a little time. Please<a href='#' class='alert-link'> wait!\n\
                 <div class='loader' >Loading...</div></a>";
            
   
    elm.style.visibility="inherit";
    elm.style.textAlign="center";
    const formData = new FormData();
    
  
    formData.append("email",korisnik.email);
    formData.append("password",korisnik.password);
       
     const fetchData =
            {
                method:"POST",
                body: formData
            }
         fetch("../php/kreiranjeNaloga.php",fetchData)
            .then(response =>
             {
                if(!response.ok)
                    throw new Error(response.statusText);

             }).then(()=>notifyKorisnik())
                .catch(error => console.log(error));
   }
   else
   {
          let innerHtml="<div class='alert alert-danger' role='alert'><strong>Username already exists!</strong></div>";
          elm.innerHTML=innerHtml;
          elm.style.visibility="inherit";
          elm.style.textAlign="center";
          const korisnickoIme=document.querySelector("input[id='regE']");
          pocrveni(korisnickoIme);
   }
 
        
}