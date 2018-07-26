
import { Component, OnInit,Output } from '@angular/core';
import { MascotaService } from '../../servicios/servicios/mascota.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { LoginService } from '../../servicios/servicios/login.service';
import { Usuario } from '../../clases/usuario';

import { AutService } from '../../servicios/servicios/aut.service';
@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {
  form : FormGroup;
  formLogin : FormGroup;
  mensajeErrorFormAlta : string;
  mensajeOKFormAlta:any;
 mostrarAlta:boolean;
 unUsuario: Usuario = new Usuario();
 usuarioLogueado:any;
 tipoLogueado:any;

  pizzas: Array<any>;
 
  pizzaSeleccionada: any;
  mostrarPizzaSelecionada = false;
  resultadoBusqueda: string;
  seguardo: boolean=false;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public origin :any ;
  nombre = new FormControl('',[Validators.required]);
  
    clave = new FormControl('',[Validators.required]);
    
    registroFormulario:FormGroup = this.builder.group(
                    {
                      nombre:this.nombre,
                      
                      clave:this.clave,
                   
                    }
                  );    



  constructor(public servicio:MascotaService ,  private auth: AutService,
    private builder:FormBuilder,formBuilder: FormBuilder, public servicioLogin:LoginService
  
  ) { 

    this.mostrarAlta=true;

    this.form = formBuilder.group({
      nroficha: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      raza: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      color: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      edad: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      tipo: [null, Validators.compose([Validators.required])],
      
    });

    this.formLogin = formBuilder.group({
      email: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      clave: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      
    });


    this.servicioLogin.traerJWT()
    .then(data => {
      console.log(data);
      this.unUsuario.nombre = data.nombre;
      this.unUsuario.clave = data.clave;
                        
    })
    .catch(e => {
      console.log(e);
    });

    this.usuarioLogueado=this.auth.getToken();
    console.log(this.usuarioLogueado.data.clave);
    console.log(this.usuarioLogueado.data.email);

    var formData = new FormData();
  
    formData.append('email', this.usuarioLogueado.data.email);

    this.servicioLogin.Obtener(this.usuarioLogueado.data.email)
    .then(datos => {
      console.log(datos);
      console.log(datos.tipo);
      this.tipoLogueado=datos.tipo; 
    })
    .catch(error => {
      console.log(error);
    });

this.ngOnInit();
  }

  ngOnInit() {
   
  }
  guardar(){ 
    this.mensajeOKFormAlta='';

//VERIFICACION DE SABOR
if (this.form.get('nroficha').invalid) {
  this.mensajeErrorFormAlta = 'El nro ficha es obligatorio y debe estar compuesto de hasta 50 letras';
  return;
}
//VERIFICACION DE CANTIDAD
if(this.form.get('raza').invalid){
  this.mensajeErrorFormAlta = 'La raza es obligatoria y solo se admiten numeros';
  return;
}
//VERIFICACION DE SEXO
if(this.form.get('tipo').invalid){
  this.mensajeErrorFormAlta = 'Debe seleccionar un tipo';
  return;
}
if(this.form.valid){
  //CREACION DE OBJETO FORMDATA QUE CONTENDRA LA INFO DEL FORMULARIO
  var formData = new FormData();
  //AGREGADO DE LA FOTO AL FORMADATA
  /* formData.append('foto', (<HTMLInputElement>document.getElementById('foto')).files[0]); */
  //AGREGADO DE PARES CLAVE/VALOR AL FORMDATA
  formData.append('nroficha', this.form.value.nroficha);
  formData.append('raza', this.form.value.raza);
  formData.append('color', this.form.value.color);
  formData.append('edad', this.form.value.edad);
  formData.append('tipo', this.form.value.tipo);
  formData.append('usuario', this.usuarioLogueado.data.email);
  

 
  this.servicio.Agregar(formData)
  .then();
  this.mensajeOKFormAlta='Ingresado correctamente'
  this.seguardo=true;
  
  this.mensajeErrorFormAlta = '';
 // .then(() => this.mensajeOKFormAlta='Se guardo correctamente');

 // this.mostrarForm = false;
 //this.mensajeOKFormAlta.emit('Ingresado');
  this.form.reset();

}
  }

  Ingresar(){
    
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
        this.mostrarAlta=true;
      }
      
    }  )
    .catch( e => {
      console.info(e);
      alert("Mascota inexistente. Ingrese nuevamente.")
    } );; 
  }


 
  mySplit(string, nb){
    var array = string.split(' ');
    return array[nb];}


  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
       
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        console.log(this.latitude,this.longitude);
       
      });
    }
    //this.origin.latitude=this.latitude;
   // this.origin.longitude=this.longitude;
  }
}


