import { Component, OnInit } from '@angular/core';

import { MiJuego } from '../../clases/miJuego'

@Component({
  selector: 'app-mi-juego',
  templateUrl: './mi-juego.component.html',
  styleUrls: ['./mi-juego.component.css']
})
export class MiJuegoComponent implements OnInit {

 
  nuevoJuego: MiJuego;
  Mensajes:string;
  contador:number;
  ocultarVerificar:boolean;
  ocultarComenzar:boolean;
  mensaje : string;
  repetidor:any;
  Tiempo:number;

  constructor() {
    this.nuevoJuego = new MiJuego(); 
    this.ocultarVerificar=true;
    this.ocultarComenzar=false;
    this.Tiempo=15;
   }

   generarPalabra() {
    this.nuevoJuego.asignarPalabra();
    this.contador=0;
    //this.ocultarVerificar = false;
    this.nuevoJuego.gano = false;
    this.Mensajes = "";
    this.ocultarComenzar=true;
    this.ocultarVerificar=false;
    this.repetidor = setInterval(()=>{ 
       
       this.Tiempo--;
       console.log("llego", this.Tiempo);
       if(this.Tiempo==0 ) {
         clearInterval(this.repetidor);
         this.verificar();
         //this.ocultarComenzar=false;
         //this.ocultarVerificar=true;
         this.Tiempo=15;
       }
       }, 900);

  }

  verificar()
  {
    this.contador++;
    this.ocultarVerificar=true;

    if (this.nuevoJuego.verificar()){
      this.MostarMensaje("Sos un Genio!!!",true);
    }else{
      this.mensaje = "Ooops, casi lo lograste!";
      this.MostarMensaje(this.mensaje); 
    }
    console.info("Gano: ",this.nuevoJuego.gano);  
    this.ocultarComenzar=false;

    //this.ocultarVerificar=true;
    clearInterval(this.repetidor);
    this.Tiempo=15; 
  }  

  MostarMensaje(mensaje:string,gano:boolean=false) {
    this.Mensajes = mensaje;    
    var x = document.getElementById("msj");
    if(gano)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }

   /* var modelo = this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar=true;
     }, 3000);
    console.info("objeto",x);*/
  
   }  

  


  ngOnInit() {
  }
}