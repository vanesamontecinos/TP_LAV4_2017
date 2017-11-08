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
  constructor() { 
    this.comenzar;
    this.jugar=true;
  }

  ngOnInit() {
  }

   comenzar()
  {
    //Genero el número RANDOM entre 1 y 3
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
    console.log("jhjkhkj");
    alert("la maquina selecciono: "+this.eleccionMaquina);
    this.eleccionHumano="piedra";
    if(this.eleccionHumano==this.eleccionMaquina)
    {
      alert("empate.");	
      this.ContadorDeEmpates++;	
    }
    else if(this.eleccionMaquina=="tijera")
    {
      alert("vos ganastes.");
      this.ContadorDeGanadas++;
    }
    else
    {
      alert("ganó la Maquina.");
      this.ContadorDePerdidas++;
    }
  
 this. mostarResultado();
  
  }//FIN DE LA FUNCIÓN
   papel()
  {
    alert("la maquina selecciono: "+this.eleccionMaquina);
    this.eleccionHumano="papel";
    if(this.eleccionHumano==this.eleccionMaquina)
    {
      alert("empate.");
      this.ContadorDeEmpates++;		
  
    }
    else if(this.eleccionMaquina=="piedra")
    {
      alert("vos ganastes.");
      this.ContadorDeGanadas++;
    }
    else
    {
      alert("ganó la Maquina.");
      this.ContadorDePerdidas++;
    }
  this.mostarResultado();
  }//FIN DE LA FUNCIÓN
   tijera()
  {
    alert("la maquina selecciono: "+this.eleccionMaquina);
    this.eleccionHumano="tijera";
    if(this.eleccionHumano==this.eleccionMaquina)
    {
      alert("empate.");
      this.ContadorDeEmpates++;		
    }
    else if(this.eleccionMaquina=="papel")
    {
      alert("vos ganastes.");
      this.ContadorDeGanadas++;
    }
    else
    {
      alert("ganó la Maquina.");
      this.ContadorDePerdidas++;
    }
 this.mostarResultado();
  }//FIN DE LA FUNCIÓN
  
   mostarResultado()
  {
  
  //document.getElementById('empatadas').=this.ContadorDeEmpates + " partidas empatadas.";
  //document.getElementById('perdidas').value=this.ContadorDePerdidas + " partidas perdidas.";
  //document.getElementById('ganadas').value=this.ContadorDeGanadas + " partidas ganadas.";
  
  this.comenzar();
  }

}
