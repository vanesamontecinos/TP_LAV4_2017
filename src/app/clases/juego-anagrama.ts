import  { Juego } from '../clases/juego';

export class JuegoAnagrama extends Juego {
    respuestaIngresada : string;
    respuesta : string;
    palabraOrdenada="";
    palabraDesordenada="";
    palabraIngresada="";

    constructor(nombre?: string, gano?: boolean,jugador?:string){
        super(" Anagrama ",gano,jugador);
    }

    arrayDePalabras : Array <any >= [
        { ordenada:"sistema",desordenada:"semitas" },
        { ordenada:"sistema",desordenada:"estimas" },
        { ordenada:"clase",desordenada:"alces" },
        { ordenada:"estilos",desordenada:"islotes" },
        { ordenada:"materias",desordenada:"maestria" },
        { ordenada:"asignatura",desordenada:"angustiara" },
        { ordenada:"sistema",desordenada:"mesitas" },
        { ordenada:"tabla",desordenada:"balta" },
        { ordenada:"libro",desordenada:"briol" },
        { ordenada:"lapicera",desordenada:"paralice" },
        { ordenada:"base",desordenada:"sabe" },
        { ordenada:"datos",desordenada:"todas" }

    ];

    public asignarPalabra() {       
        let indice;
        indice =Math.floor(Math.random() * this.arrayDePalabras.length);
        console.log(this.arrayDePalabras[indice]["ordenada"]);
        this.palabraDesordenada=this.arrayDePalabras[indice]["desordenada"];
        this.palabraOrdenada=this.arrayDePalabras[indice]["ordenada"];
    }

    public verificar() {
        if (this.palabraIngresada == this.palabraOrdenada ) 
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
