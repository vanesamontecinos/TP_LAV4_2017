export class Jugador {
    nombre:string;
    pass:string;
    //gano:boolean;
    //juego:string;


    constructor(nombre?: string, pass?: string) {
        if (nombre)
          this.nombre = nombre;
    
        if (pass)
          this.pass = pass;
        
        else
          this.nombre= "invitado";
      }
    
}
