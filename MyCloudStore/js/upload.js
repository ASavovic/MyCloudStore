const kontenjer=document.querySelector("div[class='kontenjer']");
const sadrzajFajla=document.querySelector("textarea[id='message-text']");
const cryptAlgorithm=document.querySelector("select[id='algoritamSelect1']");
const kljucInput=document.querySelector("input[id='kljuc']");
const dugmeForUpload=document.querySelector("button[id='dugmeZaUpload']");
dugmeForUpload.onclick= (ev)=>funkZaUpload();
function funk(){console.log("test")};
dugmeForUpload.onclck = (ev)=> uploadFajla(ev);
var sadrzaj= null;
var imefajla= null;
var idUsera= null;
var kljucC=null;
var FajloviGlobal=[];
var KljuceviGlobal=[];
var fileSize=null;
pribavljanjeFajlova();
//pribaviKljuceveGlobal();


//=document.querySelector("button[id='dugmeUpload']");

//<button type="button" class="btn btn-secondary btn-lg btn-block">Block level button</button>
const inputupload=document.querySelector("div[id='inputfile']");
const dugmelogout=document.querySelector("button[id='logout']");
dugmelogout.onclick=(ev)=> window.open("../html/login.html","_self");
inputupload.style="visibility: hidden";//'visible';

const mojifajlovi=document.querySelector("a[id='mojifajlovi']");
mojifajlovi.onclick = (ev)=> ucitajFajlove(ev);

const noviupload=document.querySelector("a[id='noviupload']");
noviupload.onclick = (ev)=> prikaziFileInput(ev);
function ucitajFajlove(ev)
{
    kontenjer.style="visibility: visible";//'visible';
    inputupload.style="visibility: hidden";//'visible';
}

function prikaziFileInput(ev)
{
    kontenjer.style="visibility: hidden";//'visible';
    inputupload.style="visibility: visible";//'visible';
}
const input=document.querySelector('input[type="file"]');
input.addEventListener('change',function(e){
     var files = this.files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(event) {
        $('#exampleModal').modal('show');
        sadrzajFajla.value=event.target.result;
        //reader.fileName = files[0].name;
        sadrzaj= sadrzajFajla.value;
        imefajla=files[0].name;
        fileSize=input.files[0].size;
       // console.log(input.files[0].size);
        //kljucC=kljuc.value;
        
        idUsera=sessionStorage.getItem("id");
        //console.log('File name:', files[0].name);
       // console.log(sessionStorage.getItem("id"));
    };
    reader.readAsText(files[0]);
    pribavljanjeFajlova();
    },false);

       /*
       $('#exampleModal').on('hide.bs.modal', function (event) {
         var modal = $(this)*/
        
 //   };
 /*   reader.readAsText(files[0]);
    pribavljanjeFajlova();
    
},false)*/

function funkZaUpload()
{
    
    var kodiraniSadrzaj;
    //kljucC=kljuc.value;
      //console.log(sadrzajFajla.value.toString());
       //kodiraniSadrzaj=enSubstitute(sadrzajFajla.value.toString(),"ogqdueismchvrwtyxklfjbapnz");
       kljucC=kljucInput.value;
   switch(cryptAlgorithm.value) {
    case '0':
       kodiraniSadrzaj=enSubstitute(sadrzajFajla.value,kljucC);
      break;
    case '1':
        var keyRes=[];
        keyRes=kljucInput.value.split(" ");
        /* var privateKey = {
           w: [2,3,7,14,30,57,120,251],
           wSum: 0,
           n: 491,
           m: 41 
           };*/
           var privateKey = {
            w: [],
            wSum: 0,
            m: 0,
            n: 0
            };
            for(var i=0;i<8;i++)
                privateKey.w[i]=keyRes[i];
            privateKey.m=keyRes[8];
            privateKey.n=keyRes[9];
           var keys=[];
           keys=generateKeyPair(privateKey);
           kljucC="["+keys[0].w.toString()+","+keys[0].m+","+keys[0].n+"]";
           //kljucC=keys[0].w;
           kodiraniSadrzaj=encrypt(sadrzajFajla.value,keys[1]);
      break;
  }
const formData = new FormData();
formData.append("id",sessionStorage["id"]);
formData.append("fileContent",kodiraniSadrzaj);
formData.append("idUser",sessionStorage["id"]);
formData.append("fileName",imefajla);
formData.append("Algorithm",cryptAlgorithm.value);
formData.append("Key",kljucC);
formData.append("fileSize",fileSize);
   const fetchData =
           {
               method:"POST",
               body: formData
           }
        fetch("../php/uploadFile.php",fetchData)
           .then(response =>
          {
              if(!response.ok)
                throw new Error(response.statusText);
              else
                 return response.json();

           }).then((resNew) => {prikaziFajloveKorisnika(resNew)})

           .catch(error => console.log(error));
          // $('#exampleModal').hide();
          // $('.modal-backdrop').hide();

}

function pribavljanjeFajlova()
{
     const formData = new FormData();
     formData.append("id",sessionStorage["id"]);
   
        const fetchData =
                {
                    method:"POST",
                    body: formData
                }
             fetch("../php/vratiFajlove.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                }).then((resNew) => {prikaziFajloveKorisnika(resNew)})

                .catch(error => console.log(error));
   
}

function prikaziFajloveKorisnika(fajlovi)
{
    pribaviKljuceveGlobal();
    kontenjer.innerHTML="<h2>My Uploads</h2><div class="+"row"+"> </div></div> <hr>";
    FajloviGlobal=fajlovi.fajlovi;
  //  console.log(fajlovi.fileName);
  // var htmlSadrzaj="<div class="+"container-fluid"+"> <h2>My Uploads</h2><div class="+"row"+"> </div></div> <hr>";
    fajlovi.fajlovi.reverse().forEach(element => {
    var blok= document.createElement("div");
    //htmlSadrzaj= "<div class="+"row"+"><h6>"+element.fileName +"</h6></div>"
    blok.className='blok';
    //blok.style.flexDirection = 'row-reverse';
     var blok3= document.createElement("div");
    blok3.className='blok3';
    blok3.innerHTML="<h6>"+element.fileName +"</h6>";
     blok.appendChild(blok3);
     var blok5= document.createElement("div");
     blok5.className='blok5';
     blok5.innerHTML=element.fileDate;
     blok.appendChild(blok5);
     var blok6= document.createElement("div");
     blok6.className='blok5';
     blok6.innerHTML=element.fileSize+" B";
     blok.appendChild(blok6);
    var blok2= document.createElement("div");
     blok2.className='blok2';
    blok.appendChild(blok2);
     var blok4= document.createElement("div");
     blok4.className='blok4';
    var dugme1= document.createElement("button");
    dugme1.className='btn btn-success';
    dugme1.value=element.id;
    dugme1.innerHTML="Download";
    var dugme2= document.createElement("button");
    dugme2.className="btn btn-danger";
    dugme2.innerHTML="Delete";
    dugme2.value=element.id;
    var dugme3= document.createElement("button");
    dugme3.className="btn btn-info";
    dugme3.innerHTML="Preview crypted";
    dugme3.value=element.id;
    blok2.appendChild(dugme1);
   // blok2.appendChild(blok4);
    blok2.appendChild(dugme2);
    //blok2.appendChild(blok4);
    blok2.appendChild(dugme3);
    var linija= document.createElement("hr");
    
    kontenjer.appendChild(blok);
    kontenjer.appendChild(linija);
//<button type="button" class="btn btn-success">Success</button>
//<button type="button" class="btn btn-danger">Danger</button><hr>
    //console.log(element);
  });
    // htmlSadrzaj+= "<div class="+"row"+"><h4>"+f.fileName +"</h4>></div><hr>";
       //console.log(f);
   
   pokupiSvuDugmad();
   
}


function pokupiSvuDugmad()
{
    var dugmeForUpload=document.querySelectorAll("button[class='btn btn-success']");
    dugmeForUpload.forEach((dugme)=>{dugme.onclick=(ev)=>preuzmiFajl(ev,dugme.value)})
    
    var dugmeForDelete=document.querySelectorAll("button[class='btn btn-danger']");
    dugmeForDelete.forEach((dugme)=>{dugme.onclick=(ev)=>obrisiFajl(ev,dugme.value)})
     
    var dugmeForPreview=document.querySelectorAll("button[class='btn btn-info']");
    dugmeForPreview.forEach((dugme)=>{dugme.onclick=(ev)=>prikaziKriptovaniFajl(ev,dugme.value)})
}
function preuzmiFajl(ev,id)
{
    let imeFajla;
    let podaci;
   FajloviGlobal.forEach((f)=>
   {if(f.id==id)
       {
           imeFajla=f.fileName;
           podaci=f.fileContent;
       }
       });
       downloadFile(imeFajla, podaci,id);
}
function obrisiFajl(ev,id)
{
     
     $('#changeModal').modal('hide');
     const formData = new FormData();
     formData.append("idFile",id);
     formData.append("idUser",sessionStorage["id"]);
   
        const fetchData =
                {
                    method:"POST",
                    body: formData
                }
             fetch("../php/obrisiFajl.php",fetchData)
                .then(response =>
               {
                   if(!response.ok)
                     throw new Error(response.statusText);
                   else
                      return response.json();

                }).then((resNew) => {prikaziFajloveKorisnika(resNew)
               })

                .catch(error => console.log(error));
   
}
function pribaviKljuceveGlobal()
{
    
fetch("../js/kljucevi.json")
.then(function(resp)
       {
      
              return resp.json();

        }).then(function(resNew) {download(resNew)});



}
function download(kljuceviG) {


    KljuceviGlobal=kljuceviG;
        
 
}

function downloadFile(filename,text,id)
{
    let dekriptovanisadrzaj=null;
    let Alg=null;
    let keyForDecript=null;
    KljuceviGlobal.forEach((fIden)=>
    {if (fIden.idFile==id)
        {
            keyForDecript=fIden.kljuc;
            Alg=fIden.Algorithm;
        }
    });
    if(Alg==="0")
    {
        dekriptovanisadrzaj=deSubstitute(text,keyForDecript);
    }else
    {
        var privateKey = {
            w: [],
            wSum: 0,
            n: 0,
            m: 0 
            };
            for(var i=0;i<8;i++)
            privateKey.w[i]=keyForDecript[i];
            privateKey.m=keyForDecript[8];
            privateKey.n=keyForDecript[9];
            dekriptovanisadrzaj=decrypt(text,privateKey);

    }
    
    /*
     switch(Alg) {
         case "0":
            dekriptovanisadrzaj=deSubstitute(text,keyForDecript);
           break;
         case "1":
              var privateKey = {
                w: [],
                wSum: 0,
                n: 0,
                m: 0 
                };
                for(var i=0;i<8;i++)
                privateKey.w[i]=keyForDecript[i];
                privateKey.m=keyForDecript[8];
                privateKey.n=keyForDecript[9];
                dekriptovanisadrzaj=decrypt(text,privateKey);
            
           break;
       }*/
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dekriptovanisadrzaj.toString()));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function prikaziKriptovaniFajl(ev,id)
{
    let sadrzajFajla=document.querySelector("textarea[id='CriptedContent']");

    sadrzajFajla.value=vratiKriptovaniSadrzajFajla(id);
    
    $('#exampleModal2').modal('show');
}

function vratiKriptovaniSadrzajFajla(id)
{
    let pom=null;
    FajloviGlobal.forEach((fajl)=>{if(fajl.id===id) pom=fajl.fileContent;})
    return pom;
}

