import  { Juego } from '../clases/juego';

export class MiJuego extends Juego {
    respuestaIngresada : string;
    respuesta : string;
    palabraOrdenada="";
    palabraDesordenada="";
    palabraIngresada="";
    numeroIngresado="";

    constructor(nombre?: string, gano?: boolean,jugador?:string){
        super(" Adivinanza ",gano,jugador);
    }

    arrayDePalabras : Array <any >= [
        { ordenada:"/assets/imagenes/mijuego/avatargif.gif",desordenada:"avatar" },
        { ordenada:"/assets/imagenes/mijuego/CisneNegroGif.gif",desordenada:"el cisne negro" },
        { ordenada:"/assets/imagenes/mijuego/elclan.jpg",desordenada:"el clan" },
        { ordenada:"/assets/imagenes/mijuego/Elresplandor.jpg",desordenada:"el resplandor" },
        { ordenada:"/assets/imagenes/mijuego/itgif.gif",desordenada:"it" },
        { ordenada:"/assets/imagenes/mijuego/titanicgif.gif",desordenada:"titanic" },
        { ordenada:"/assets/imagenes/mijuego/killbillgif.gif",desordenada:"kill bill" },
        { ordenada:"/assets/imagenes/mijuego/milagrosgif.gif",desordenada:"milagros inesperados" },
        { ordenada:"/assets/imagenes/mijuego/rapidogif.gif",desordenada:"rapido y furioso" },
        { ordenada:"/assets/imagenes/mijuego/relatosgif.gif",desordenada:"relatos salvajes" },
       // { ordenada:"/assets/imagenes/mijuego/titanic.jpg",desordenada:"titanic" },
        { ordenada:"/assets/imagenes/mijuego/vengadores.gif",desordenada:"los vengadores" },
        { ordenada:"/assets/imagenes/mijuego/lavida.jpg",desordenada:"la vida es bella" },
        { ordenada:"/assets/imagenes/mijuego/lavidagif.gif",desordenada:"la vida es bella" },
        { ordenada:"/assets/imagenes/mijuego/volvergif.gif",desordenada:"volver al futuro" },
        { ordenada:"/assets/imagenes/mijuego/coco.gif",desordenada:"coco" },
        { ordenada:"/assets/imagenes/mijuego/angelito.gif",desordenada:"mi pobre angelito" },
       

    ];

    public asignarImagen() {       
        let indice;
        indice =Math.floor(Math.random() * this.arrayDePalabras.length);
        console.log(this.arrayDePalabras[indice]["ordenada"]);
      // console.log(this.arrayDePalabras[0]["ordenada"]);
        this.palabraDesordenada=this.arrayDePalabras[indice]["ordenada"];
      //  this.palabraDesordenada=this.arrayDePalabras[0]["ordenada"];
        this.respuesta=this.arrayDePalabras[indice]["desordenada"];
        console.log(this.palabraDesordenada);
    }

    public verificar() {
        if (this.palabraIngresada == this.respuesta ) 
        {
          this.gano = true;
          this.palabraOrdenada="";
          this.palabraDesordenada="";
          this.palabraIngresada=""; 
        }
        if (this.gano) {
          return true;
        } else {
          return false;
        }
    }

}
