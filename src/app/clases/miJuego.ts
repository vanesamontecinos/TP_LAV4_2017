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
        { ordenada:"../assets/imagenes/mijuego/avatar.jpg",desordenada:"avatar" },
        { ordenada:"../assets/imagenes/mijuego/CisneNegro.jpg",desordenada:"el cisne negro" },
        { ordenada:"../assets/imagenes/mijuego/clan.jpg",desordenada:"el clan" },
        { ordenada:"../assets/imagenes/mijuego/Elresplandor.jpg",desordenada:"el resplandor" },
        { ordenada:"../assets/imagenes/mijuego/it.jpg",desordenada:"it" },
        { ordenada:"../assets/imagenes/mijuego/killbill.jpg",desordenada:"kill bill" },
        { ordenada:"../assets/imagenes/mijuego/milagros.jpg",desordenada:"milagros inesperados" },
        { ordenada:"../assets/imagenes/mijuego/rapido.jpg",desordenada:"rapido y furioso" },
        { ordenada:"../assets/imagenes/mijuego/relatos.jpg",desordenada:"relatos salvajes" },
        { ordenada:"../assets/imagenes/mijuego/titanic.jpg",desordenada:"titanic" },
        { ordenada:"../assets/imagenes/mijuego/27kilos.png",desordenada:"27" },
        { ordenada:"../assets/imagenes/mijuego/87.jpg",desordenada:"87" },
        { ordenada:"../assets/imagenes/mijuego/12.jpg",desordenada:"12" },
        { ordenada:"../assets/imagenes/mijuego/elfuego.png",desordenada:"el fuego" },
        { ordenada:"../assets/imagenes/mijuego/3.png",desordenada:"3" },
        { ordenada:"../assets/imagenes/mijuego/autobus.jpg",desordenada:"izquierda" },
       

    ];

    public asignarPalabra() {       
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
