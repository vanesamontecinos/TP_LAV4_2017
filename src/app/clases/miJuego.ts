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
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/avatar.jpg",desordenada:"avatar" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/CisneNegro.jpg",desordenada:"el cisne negro" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/clan.jpg",desordenada:"el clan" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/Elresplandor.jpg",desordenada:"el resplandor" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/it.jpg",desordenada:"it" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/killbill.jpg",desordenada:"kill bill" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/milagros.jpg",desordenada:"milagros inesperados" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/rapido.jpg",desordenada:"rapido y furioso" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/relatos.jpg",desordenada:"relatos salvajes" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/titanic.jpg",desordenada:"titanic" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/27kilos.png",desordenada:"27" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/87.jpg",desordenada:"87" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/12.jpg",desordenada:"12" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/elfuego.png",desordenada:"el fuego" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/3.png",desordenada:"3" },
        { ordenada:"/TP_LAV4_2017/assets/imagenes/mijuego/autobus.jpg",desordenada:"izquierda" },
       

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
