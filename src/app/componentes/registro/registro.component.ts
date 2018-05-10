import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Jugador } from '../../clases/jugador';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  JugadoresRegistrados:Array<Jugador>;
  JugadoresRegistrados2:Array<Jugador>;
email: string='';
psw:string='';
psw2:string='';
nuevoJugador:Jugador;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  registrarse()
  {
    
   this.JugadoresRegistrados= new Array<Jugador>();
    //  this.nuevoJugador=new Jugador(this.email,this.psw);

     // this.personadelcomponente = new Persona();
    // this.JugadoresRegistrados=new Array<Jugador>();
      this.JugadoresRegistrados2=JSON.parse(localStorage.getItem('datos'));
      if (this.JugadoresRegistrados2!=null)
      {

        this.JugadoresRegistrados=this.JugadoresRegistrados2;
      }
   //   console.log(this.arrayUsuarios);
  
      if(this.email!=null && this.email!=undefined)
      console.log(this.email);
      console.log(this.psw);
      this.nuevoJugador=new Jugador(this.email,this.psw);
  
        // && this.psw!=null && this.psw!=undefined && this.psw2!=null && this.psw2!=undefined)
      {
        if(this.psw==this.psw2)
        {
         // this.personadelcomponente.usuario=this.email;
          //this.personadelcomponente.contraseña=this.pass;
      
          console.log('this1'+this.JugadoresRegistrados);
          console.log(this.nuevoJugador);
          this.JugadoresRegistrados.push(this.nuevoJugador);
        
          localStorage.setItem('datos', JSON.stringify(this.JugadoresRegistrados));
          localStorage.setItem('Jugador', JSON.stringify(this.nuevoJugador));
          
       // this.personadelcomponente.guardar();
       console.log('this'+this.JugadoresRegistrados);
        //  localStorage.setItem("usuario",'{"email":"'+this.email+'","pass":"'+this.pass+'"}');
          this.router.navigate(['/Juegos']);
        //  this.personadelcomponente.Traer();
        //this.arrayUsuarios = JSON.parse(localStorage.getItem("usuario"));
         // console.log('MOSTRAR'+this.arrayUsuarios);
          
  
        }else{
          alert("Las contraseñas no coinciden");
        }
      }/*else{      
        alert("Complete todos los campos");
      }*/
    }
   
  }