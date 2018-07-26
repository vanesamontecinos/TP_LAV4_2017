import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { LoginService } from '../../servicios/servicios/login.service';
import { Usuario } from '../../clases/usuario';
//import { Usuario } from '../../clases/usuarios';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  unUsuario: Usuario = new Usuario();
  usuario = '';
  //clave= '';
  jugador:'';
  contraseña:'';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;
  form:FormGroup;




  clase="progress-bar progress-bar-info progress-bar-striped ";


  nombre = new FormControl('',[Validators.required]);
  
    clave = new FormControl('',[Validators.required]);
    mail = new FormControl('',[Validators.required]);
    perfil = new FormControl('',[Validators.required]);
    
    registroFormulario:FormGroup = this.builder.group(
                    {
                      nombre:this.nombre,
                      
                      clave:this.clave,
                      mail:this.mail,
                      
                      perfil:this.perfil,
                   
                    }
                  );    
  constructor(
    private route: ActivatedRoute,
    private router: Router,

 
    private servicioLogin: LoginService,
    private builder:FormBuilder) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";



      this.form = builder.group({
        nombre: [null, Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$'), Validators.required])],
        mail: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
        clave: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
        perfil: [null, Validators.compose([Validators.required])],
        
      });
  }

  ngOnInit() {
  }

  Entrar() {




  var JugadoresRegistrados2=JSON.parse(localStorage.getItem('datos'));
  var noentro:boolean=true;
  console.log(JugadoresRegistrados2);
  for(let algo of JugadoresRegistrados2)
  {
 // this.usuario=algo.usuario;
 // this.clave=algo.contraseña;

    if (this.usuario === algo.nombre && this.clave === algo.pass) {
      console.log('registrado');
      this.router.navigate(['/Principal']);
      noentro=false;
      this.jugador=algo.nombre;
      this.contraseña=algo.nombre;



    }
  }
  if (noentro){
    console.log('no esta registrado');
    this.router.navigate(['/Registro']);
  }

}
 





  public enviarIngreso() {
    //console.log("Busqueda de la mascota",this.unaMascota);
    //se borra el token del usuario de la sesión anterior  
    this.unUsuario.nombre=this.form.value.nombre;  
    this.unUsuario.email=this.form.value.mail;  
    this.unUsuario.clave=this.form.value.clave;  
    this.unUsuario.perfil=this.form.value.perfil;  
   
    localStorage.removeItem('token');
    console.log(this.unUsuario);
    this.servicioLogin.buscarToken(this.unUsuario)
    .then((unToken) =>{
      //console.log("un token: ",unToken)
      if ( unToken == "sintoken" ) 
      {
        alert("Usuario inexistente. Ingrese nuevamente.")
      }
      else
      {
       localStorage.setItem('token',unToken);
        this.router.navigateByUrl("/Principal/Menu");
      }
      
    }  )
    .catch( e => {
      console.info(e);
      alert("Mascota inexistente. Ingrese nuevamente.")
    } );; 

  }  

Cliente(){
  this.unUsuario.nombre='vanesa'; 
  this.unUsuario.email='vane033@hotmail.com'; 
  this.unUsuario.clave='123'; 
  this.unUsuario.perfil='CLIENTE'; 
}
Encargado(){
  this.unUsuario.nombre='jony'; 
  this.unUsuario.email='jony@hotmail.com'; 
  this.unUsuario.clave='123'; 
  this.unUsuario.perfil='ENCARGADO'; 
}
Remisero(){
  this.unUsuario.nombre='vero'; 
  this.unUsuario.email='vero@hotmail.com'; 
  this.unUsuario.clave='123'; 
  this.unUsuario.perfil='REMISERO'; 
}
}