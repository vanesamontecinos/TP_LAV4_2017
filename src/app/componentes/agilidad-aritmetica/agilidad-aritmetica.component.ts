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
    this.completarnumeros(); 
  }
  NuevoJuego() {
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

this.completarnumeros();
  }
completarnumeros(){
  this.numeroUno =Math.floor( Math.random()*10)+1;
  this.numeroDos =Math.floor( Math.random()*10)+1;
  this.operador =Math.floor( Math.random()*3)+1;
  switch(this.operador)
  {
    case 1:
      this.eloperador="x";
      this.resultado=this.numeroUno*this.numeroDos;
      break;
    case 2:
    this.eloperador="+";
    this.resultado=this.numeroUno+this.numeroDos;
      break;
    case 3:
    this.eloperador="-";
    this.resultado=this.numeroUno-this.numeroDos;
      break;
  }
  this.nuevoJuego.gano=false;
  this.nuevoJuego.perdio=false;

}

  verificar()
  {
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);
    if (this.numeroIngresado==this.resultado)
    {this.nuevoJuego.gano=true;
  
  }
    else {this.nuevoJuego.perdio=true;  console.log("Respuesta Incorrecta! El resultado es: "+this.resultado)}
    this.numeroIngresado=null;
    this.ocultarVerificar=true;
    clearInterval(this.repetidor);
    this.Tiempo=5; 
  }  

}
