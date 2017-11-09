import { Juego } from '../clases/juego';


export class JuegoAgilidad extends Juego{

    gano:boolean;
    perdio:boolean;
    numeroUno:number;
    numeroDos:number;
    operador:number;
    eloperador:string;
    resultado:number;
    numeroingresado:number;

    constructor(nombre?: string, gano?: boolean,jugador?:string){
        super(" Agilidad Mental ",gano,jugador);
    }
generarNumeros(){
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
}

public verificar(){
    if(this.numeroingresado==this.resultado){
        this.gano=true;
    }
    else {this.gano=false; this.perdio=true;}
   
    return this.gano;

}
}
