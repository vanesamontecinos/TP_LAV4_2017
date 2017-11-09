import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piedrapapeltijera',
  templateUrl: './piedrapapeltijera.component.html',
  styleUrls: ['./piedrapapeltijera.component.css']
})
export class PiedrapapeltijeraComponent implements OnInit {

   eleccionMaquina:any="piedra";
   ContadorDeEmpates:any=0;
   ContadorDeGanadas:any=1;
   ContadorDePerdidas:any=0;
   numeroSecreto:any=1;
   eleccionHumano:any;
   jugar:boolean;
   yajugo:boolean=false;
   Mensaje:string="";
  constructor() { 
    this.comenzar;
    this.jugar=true;
    console.log(this.yajugo);
  }

  ngOnInit() {
  }

   comenzar()
  {
    //Genero el número RANDOM entre 1 y 3
    this.yajugo=false;
       this.numeroSecreto =Math.floor( Math.random()*3)+1;
      //alert(numeroSecreto);
      switch(this.numeroSecreto)
      {
        case 1:
          this.eleccionMaquina="piedra";
          break;
        case 2:
          this.eleccionMaquina="papel";
          break;
        case 3:
          this.eleccionMaquina="tijera";
          break;
  
      }
      //alert(eleccionMaquina);
  
  
  
  }//FIN DE LA FUNCIÓN
   piedra()
  {
    this.yajugo=true;
    //console.log("jhjkhkj");
   // alert("la maquina selecciono: "+this.eleccionMaquina);
    this.eleccionHumano="piedra";
    if(this.eleccionHumano==this.eleccionMaquina)
    {
      this.Mensaje="Empate!!"
      //alert("empate.");	
      this.ContadorDeEmpates++;	
    }
    else if(this.eleccionMaquina=="tijera")
    {
     // alert("vos ganastes.");
     this.Mensaje="Vos ganaste!!"
      this.ContadorDeGanadas++;
    }
    else
    {
     // alert("ganó la Maquina.");
     this.Mensaje="Gano la maquina!"
      this.ContadorDePerdidas++;
    }
  
 //this. mostarResultado();
  
  }//FIN DE LA FUNCIÓN
   papel()
  {
    this.yajugo=true;
    //console.log("jhjkhkj");
   // alert("la maquina selecciono: "+this.eleccionMaquina);
    this.eleccionHumano="papel";
    if(this.eleccionHumano==this.eleccionMaquina)
    {
      this.Mensaje="Empate!!"
      //alert("empate.");	
      this.ContadorDeEmpates++;	
    }
    else if(this.eleccionMaquina=="tijera")
    {
     // alert("vos ganastes.");
     this.Mensaje="Vos ganaste!!"
      this.ContadorDeGanadas++;
    }
    else
    {
     // alert("ganó la Maquina.");
     this.Mensaje="Gano la maquina!"
      this.ContadorDePerdidas++;
    }
  }//FIN DE LA FUNCIÓN
   tijera()
  {
    this.yajugo=true;
    //console.log("jhjkhkj");
   // alert("la maquina selecciono: "+this.eleccionMaquina);
    this.eleccionHumano="tijera";
    if(this.eleccionHumano==this.eleccionMaquina)
    {
      this.Mensaje="Empate!!"
      //alert("empate.");	
      this.ContadorDeEmpates++;	
    }
    else if(this.eleccionMaquina=="tijera")
    {
     // alert("vos ganastes.");
     this.Mensaje="Vos ganaste!!"
      this.ContadorDeGanadas++;
    }
    else
    {
     // alert("ganó la Maquina.");
     this.Mensaje="Gano la maquina!"
      this.ContadorDePerdidas++;
    }
  }//FIN DE LA FUNCIÓN
  
   mostarResultado()
  {
  
  //document.getElementById('empatadas').=this.ContadorDeEmpates + " partidas empatadas.";
  //document.getElementById('perdidas').value=this.ContadorDePerdidas + " partidas perdidas.";
  //document.getElementById('ganadas').value=this.ContadorDeGanadas + " partidas ganadas.";
  
  this.comenzar();
  }

}
