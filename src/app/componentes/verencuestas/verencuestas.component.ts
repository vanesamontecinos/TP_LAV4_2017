import { AutService } from '../../servicios/servicios/aut.service';
import { ViajeService } from '../../servicios/servicios/viaje.service';
import {  FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper  } from '@agm/core';
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { Viaje } from '../../clases/viaje';
import { Usuario } from '../../clases/usuario';
import { BrowserModule } from "@angular/platform-browser";
import { LoginService } from '../../servicios/servicios/login.service';

@Component({
  selector: 'app-verencuestas',
  templateUrl: './verencuestas.component.html',
  styleUrls: ['./verencuestas.component.css']
})
export class VerencuestasComponent implements OnInit {



 
  viaje:any;
  Remiseros:any;
    listado: any;
    encuestas:any;
    unaPersona:Usuario;
    mostrarForm:boolean;
      usuarioLogueado:any;
      nombreUsuario:any;
      unViaje:Viaje;
      form : FormGroup;
      id: number;
      verDetalle:boolean;
      mostrarTabla:boolean;

      preg1:string;
      preg2:string;
      preg3:string;
      preg4:any;
      preg5:any;
      preg6:any;
      preg7:any;
      preg8:any;
      foto1:any;
      foto2:any;
      foto3:any;
      constructor( private auth: AutService,
        public servicio:LoginService,public servicioViajes:ViajeService,formBuilder: FormBuilder) { 
          this.listarEncuestas();
          
        //  this.listarVehiculos();
         this.verDetalle=false;
          this.usuarioLogueado=this.auth.getToken();
          console.log(this.usuarioLogueado.data.clave);
          console.log(this.usuarioLogueado.data.email);
          console.log(this.usuarioLogueado.data.nombre);
          this.nombreUsuario=this.usuarioLogueado.data.nombre;
          this.mostrarTabla=true;
          this.unViaje=new Viaje();
          this.mostrarForm=false;
          this.unaPersona=new Usuario();


        
        }

  ngOnInit() {
    //this.listarUsuarios();
  }

traerViaje(id){
this.servicioViajes.ObtenerUnViaje(id)
.then(datos => {
  this.viaje = datos;
  //this.random = Math.random();
})
.catch(error => {
  console.log(error);
});
}
  
  listarEncuestas(){

    this.servicioViajes.ObtenerEncuestas()
    .then(datos => {
      this.encuestas = datos;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  console.log(this.encuestas);
  }

  cambiar(algo){
    this.verDetalle=true;
   this.traerViaje(algo.viaje);
   this.preg1=algo.trato;
   this.preg2=algo.horarioCumplido;
   this.preg3=algo.vehiculoCumplido;
   this.preg4=algo.precioAcorde;
   this.preg5=algo.plataforma;
   this.preg6=algo.recomendable;
   this.preg7=algo.comentarios;
   this.preg8=algo.medios;
   this.foto1=algo.foto1;
   this.foto2=algo.foto2;
   this.foto3=algo.foto3;
  }
  cambiar2(algo){
    var nuevoEstado:string='';
    var formData = new FormData();
    formData.append('id',algo.id);
    formData.append('nombre',algo.nombre);
    formData.append('email',algo.mail);
    formData.append('tipo',algo.perfil);
    formData.append('clave',algo.clave);
    console.log('estado'+algo.estado);

    if(algo.estado=='HABILITADO'){
      nuevoEstado='DESHABILITADO';
      console.log('estadohab');
    }
    else if(algo.estado=='DESHABILITADO'){
      nuevoEstado='HABILITADO';
      console.log('estadonohab');
    }
    formData.append('estado',nuevoEstado);
    console.log('id'+algo.id);
    console.log('nombre'+algo.nombre);
    console.log('email'+algo.mail);
    console.log('tipo'+algo.perfil);
    console.log('clave'+algo.clave);
    console.log('nuevoest'+nuevoEstado);
    this.servicio.ModificarUsuario(formData)
    .then(datos => {
      console.log('nanan'+datos);
    //this.listarUsuarios();
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  }

volver()
{
  this.verDetalle=false;
}
 }


