import { Component, OnInit,Output } from '@angular/core';
import { ServiciosService } from '../../servicios/servicios/servicios.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { LoginService } from '../../servicios/servicios/login.service';
import { Usuario } from '../../clases/usuario';

import { AutService } from '../../servicios/servicios/aut.service';

@Component({
  selector: 'app-alta-servicio',
  templateUrl: './alta-servicio.component.html',
  styleUrls: ['./alta-servicio.component.css']
})
export class AltaServicioComponent implements OnInit {
  form : FormGroup;
  mensajeErrorFormAlta : string;
  mensajeOKFormAlta:any;
  usuarioLogueado:any;
  nombreUsuario:any;
  mailUsuario:any;
  seguardo: boolean=false;
  primero:boolean;
  servicios:any;
  algo:Array<any>;
  monto:any;
 listadoParaCompartir: Array<any>;

  constructor(  private auth: AutService, public servicio:ServiciosService,
    private builder:FormBuilder,formBuilder: FormBuilder, public servicioLogin:LoginService
  
  ){
    this.listadoParaCompartir = new Array<any>()
    this.primero=true;
    this.usuarioLogueado=this.auth.getToken();
    console.log(this.usuarioLogueado.data.clave);
    console.log(this.usuarioLogueado.data.email);
    this.nombreUsuario=this.usuarioLogueado.data.email;

    this.form = formBuilder.group({
      nombre: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
     
      mb: [null, Validators.compose([Validators.maxLength(50), Validators.pattern(/^\d+$/), Validators.required])],
      
   
      
    });


    
    console.info("en app",this.listadoParaCompartir);
  }

  ngOnInit() {
  }
  guardar(){ 
    this.mensajeOKFormAlta='';

//VERIFICACION DE SABOR
if (this.form.get('nombre').invalid) {
  this.mensajeErrorFormAlta = 'El nombre es obligatorio y debe estar compuesto de hasta 50 letras';
  return;
}
//VERIFICACION DE CANTIDAD
if(this.form.get('mb').invalid){
  this.mensajeErrorFormAlta = 'Los mb son obligatorios y solo se admiten numeros';
  return;
}

this.servicio.Obtener(this.usuarioLogueado.data.email)
.then(datos => {
  console.log(datos);
  
    this.monto='300';
  
  
})
.catch(error => {
  console.log(error);
});


if(this.form.valid){
  //CREACION DE OBJETO FORMDATA QUE CONTENDRA LA INFO DEL FORMULARIO
  var formData = new FormData();
  //AGREGADO DE LA FOTO AL FORMADATA
  /* formData.append('foto', (<HTMLInputElement>document.getElementById('foto')).files[0]); */
  //AGREGADO DE PARES CLAVE/VALOR AL FORMDATA
  formData.append('nombre', this.form.value.nombre);
  formData.append('mb', this.form.value.mb);
  formData.append('monto', '300');
  formData.append('usuario',this.usuarioLogueado.data.email);
  

  
  this.servicio.Agregar(formData)
  .then();
  this.mensajeOKFormAlta='Ingresado correctamente'
  this.seguardo=true;
  this.primero=false;
  
  this.mensajeErrorFormAlta = '';
 // .then(() => this.mensajeOKFormAlta='Se guardo correctamente');

 // this.mostrarForm = false;
 //this.mensajeOKFormAlta.emit('Ingresado');
  this.form.reset();

}



this.servicio.ObtenerTodos()
.then(datos => {
  this.servicios = datos;
 
})
.catch(error => {
  console.log(error);
});
console.log(this.servicios);
}}
