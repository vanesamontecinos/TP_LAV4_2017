import { AutService } from '../../servicios/servicios/aut.service';
import { ViajeService } from '../../servicios/servicios/viaje.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {  FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper  } from '@agm/core';
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { Viaje } from '../../clases/viaje';
import { Usuario } from '../../clases/usuario';
import { BrowserModule } from "@angular/platform-browser";
import { LoginService } from '../../servicios/servicios/login.service';

@Component({
  selector: 'app-listadousuarios',
  templateUrl: './listadousuarios.component.html',
  styleUrls: ['./listadousuarios.component.css']
})
export class ListadousuariosComponent implements OnInit {

 
  vehiculos:any;
  Remiseros:any;
    listado: any;
    usuarios:any;
    unaPersona:Usuario;
    mostrarForm:boolean;
      usuarioLogueado:any;
      nombreUsuario:any;
      unViaje:Viaje;
      form : FormGroup;
      id: number;
      mostrarTabla:boolean;
      constructor( private auth: AutService,private router: Router,
        public servicio:LoginService,public servicioViajes:ViajeService,formBuilder: FormBuilder) { 
        //  this.listarServicios();
          this.listarUsuarios();
          this.listarVehiculos();
         
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


  listarUsuarios(){
    
    this.servicio.ObtenerTodos()
    .then(datos => {
      this.usuarios = datos;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  console.log(this.usuarios);
  }
  
  listarVehiculos(){

    this.servicioViajes.ObtenerVehiculos()
    .then(datos => {
      this.vehiculos = datos;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  console.log(this.vehiculos);
  }

  cambiar(algo){
   // this.listarUsuarios();
    this.servicio.Borrar(algo.id).then();
    //this.listarUsuarios();
    this.unaPersona=algo;
    this.unaPersona.perfil=algo.perfil;
    this.cambiar2(algo); 
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
     this.listarUsuarios();
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  }


  cambiarVehiculo(vehiculo){
  
     this.servicio.BorrarVehiculo(vehiculo.id).then();
   
     this.cambiarvehiculo2(vehiculo); 
   }
   cambiarvehiculo2(vehiculo){
     var nuevoEstado:string='';
     var formData = new FormData();
     formData.append('id',vehiculo.id);
     formData.append('modelo',vehiculo.modelo);
     formData.append('anio',vehiculo.anio);
     formData.append('color',vehiculo.color);
     formData.append('comodidades',vehiculo.comodidades);
     console.log('estado'+vehiculo.estado);
 
     if(vehiculo.estado=='HABILITADO'){
       nuevoEstado='DESHABILITADO';
       console.log('estadohab');
     }
     else if(vehiculo.estado=='DESHABILITADO'){
       nuevoEstado='HABILITADO';
       console.log('estadonohab');
     }
     formData.append('estado',nuevoEstado);
     console.log('id'+vehiculo.id);
     console.log('nombre'+vehiculo.modelo);
     console.log('email'+vehiculo.anio);
     console.log('tipo'+vehiculo.color);
     console.log('clave'+vehiculo.comodidades);
     console.log('nuevoest'+nuevoEstado);
     this.servicio.ModificarVehiculo(formData)
     .then(datos => {
       console.log('entra'+datos);
      this.listarVehiculos();
       //this.random = Math.random();
     })
     .catch(error => {
       console.log(error);
     });
   }

   AgregarRemisero(){
    this.router.navigate(['/Principal/Alta']);
   }
   AgregarVehiculo(){
    this.router.navigate(['/Principal/AltaVehiculo']);
   }

 }


