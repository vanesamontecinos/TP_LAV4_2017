export class Listado {
    nombre:string;
    nombreJuego:string;
    gano:boolean;
    //gano:boolean;
    //juego:string;


    constructor(nombre?: string, nombreJuego?: string,gano?: boolean) {
        if (nombre)
          this.nombre = nombre;
    
        if (nombreJuego)
          this.nombreJuego = nombreJuego;
        if(gano)
        this.gano=true;
       // else
         // this.nombre= "invitado";
      }
    
}