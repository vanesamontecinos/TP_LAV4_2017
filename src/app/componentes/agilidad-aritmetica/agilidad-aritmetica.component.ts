import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  numeroUno:number;
  numeroDos:any;
  operador:number;
  eloperador:any;
  repetidor:any;
  resultado:number;
  numeroIngresado:number;
  private subscription: Subscription;
  ngOnInit() {
  }
   constructor() {
     this.ocultarVerificar=true;
     this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad"); 
    //this.completarnumeros(); 
  }
  NuevoJuego() {
    this.numeroIngresado=null;
    this.nuevoJuego=new JuegoAgilidad();
    this.completarnumeros();
    this.ocultarVerificar=false;
   this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=5;
      }
      }, 900);


  }
completarnumeros(){
  this.nuevoJuego.generarNumeros();
  
  this.nuevoJuego.gano=false;
  this.nuevoJuego.perdio=false;

}

  verificar()
  {
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);
   this.nuevoJuego.numeroingresado=this.numeroIngresado;
    if(this.nuevoJuego.verificar()){
     // this.nuevoJuego.gano=true 
    }
  
  
    else {this.nuevoJuego.perdio=true;  }
    console.log("Respuesta Incorrecta! El resultado es: "+this.nuevoJuego.resultado);
    //this.numeroIngresado=null;
    this.ocultarVerificar=true;
    clearInterval(this.repetidor);
    this.Tiempo=5; 
    
    this.enviarJuego.emit(this.nuevoJuego);

}
}