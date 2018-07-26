export abstract class Juego {
    public nombre = 'Sin Nombre';
    public jugador: any;
    public gano = false;
  
    constructor(nombre?: string, gano?: boolean,jugador?:any) {
      var jugador1:any;
      if (nombre)
        this.nombre = nombre;
  
      if (gano)
        this.gano = gano;
   /*   if(jugador)
        this.jugador=jugador;
      else
        this.jugador= "invitado";*/
  
        jugador1=JSON.parse(localStorage.getItem('Jugador'));
        this.jugador=jugador1.nombre;
        console.log(jugador1);
        console.log(jugador1.nombre);
        console.log(this.jugador);
    }
  
  
    
  
    public abstract verificar():boolean; 
    
    public retornarAyuda() {
      
      return "NO hay Ayuda definida";
    }
  }
  