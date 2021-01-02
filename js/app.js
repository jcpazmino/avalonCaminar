(function () {//* garantiza que las aimaciones funcionen en los diferentes navegadores */
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var path_imgs= {
    atras : "./imgs/atras/",
    derecha : "./imgs/derecha/",
    frente : "./imgs/frente/",
    izquierda : "./imgs/izquierda/"
}
var c = document.getElementById("c_avalon");
var ctx = c.getContext("2d");
var canvasW = c.width;
var canvasH = c.height;
var fotogramasPorSegundo = 15;

var backgroundImage = new Image();
var flechas = new Image();
var avalon = {
    atras: new Image(),
    derecha: new Image(),
    frente: new Image(),
    izquierda: new Image()
}
var posicion = {
    atrasX: 10, atrasY: 10,
    frenteX: 150, frenteY: 10,
    izquierdaX: 300, izquierdaY: 10,
    derechaX: 450, derechaY: 10
}

var parado= {
    atras: true, derecha: true, frente: true, izquierda: true
}

var i= {
    atras: 1, derecha: 1, frente: 1, izquierda: 1
}

function cargarImagenes (){
    avalon.atras.src = path_imgs.atras + "atras1.png";
    avalon.derecha.src = path_imgs.derecha + "derecha1.png";
    avalon.frente.src = path_imgs.frente + "frente1.png";
    avalon.izquierda.src = path_imgs.izquierda + "izquierda1.png";
    backgroundImage.src = "./imgs/fondo.jpg";
    flechas.src = "./imgs/flechas.png";
}
cargarImagenes ();
backgroundImage.addEventListener('load', iniciar, false);


function iniciar() {
    ctx.drawImage(backgroundImage, 0, 0);   
    ctx.drawImage(flechas, 30, 100);
    parado.frente=true;parado.atras=true;parado.derecha=true;parado.izquierda=true;
    animacion();
}
function mostrarAvaonInic(){
    if(parado.atras) ctx.drawImage(avalon.atras, posicion.atrasX, posicion.atrasY);   
    if(parado.derecha) ctx.drawImage(avalon.derecha, posicion.derechaX, posicion.derechaY);   
    if(parado.frente) ctx.drawImage(avalon.frente, posicion.frenteX, posicion.frenteY);
    if(parado.izquierda) ctx.drawImage(avalon.izquierda, posicion.izquierdaX, posicion.izquierdaY);
}

function animacion(){
    time_avalon=setTimeout(function() {       
        ctx.drawImage(backgroundImage, 0, 0);    
        ctx.drawImage(flechas, 30, 100);   
        if(!parado.frente) mueveFrente();
        if(!parado.atras) mueveAtras();  
        if(!parado.derecha) mueveDerecha();    
        if(!parado.izquierda) mueveIzquierda();         
        mostrarAvaonInic();
        id_Animation = window.requestAnimationFrame(animacion); 
    }, 1000 / fotogramasPorSegundo);

    this.mueveFrente = function () {
        if (i.frente >= 7) i.frente = 1;  else i.frente++;
        avalon.frente.src = path_imgs.frente + "frente" + i.frente + ".png";
        ctx.drawImage(avalon.frente, posicion.frenteX, posicion.frenteY);    
    }
    this.mueveAtras = function () {
        if (i.atras >= 7) i.atras = 1;  else i.atras++;
        avalon.atras.src = path_imgs.atras + "atras" + i.atras + ".png";
        ctx.drawImage(avalon.atras, posicion.atrasX, posicion.atrasY);
    }
    this.mueveDerecha = function () {
        if (i.derecha >= 7) i.derecha = 1;  else i.derecha++;
        avalon.derecha.src = path_imgs.derecha + "derecha" + i.derecha + ".png";
        ctx.drawImage(avalon.derecha, posicion.derechaX, posicion.derechaY);
    }
    this.mueveIzquierda = function () {
        if (i.izquierda >= 7) i.izquierda = 1;  else i.izquierda++;
        avalon.izquierda.src = path_imgs.izquierda + "izquierda" + i.izquierda + ".png";
        ctx.drawImage(avalon.izquierda, posicion.izquierdaX, posicion.izquierdaY);   
    }
}

document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if event already handled
    }
    switch (event.code) {
        case "ArrowRight":
            (parado.derecha == true)? parado.derecha = false:parado.derecha = true;                       
        break;
        case "ArrowLeft":
            (parado.izquierda == true)? parado.izquierda = false:parado.izquierda = true;
        break;
        case "ArrowUp":
            (parado.atras == true)? parado.atras = false:parado.atras = true;
        break;  
        case "ArrowDown":
            (parado.frente == true)? parado.frente = false:parado.frente = true;
        break;             
    }
})