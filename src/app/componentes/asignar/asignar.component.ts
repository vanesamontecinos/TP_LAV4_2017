import { AutService } from '../../servicios/servicios/aut.service';
import { ViajeService } from '../../servicios/servicios/viaje.service';
import {  FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper  } from '@agm/core';
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { Viaje } from '../../clases/viaje';
import { BrowserModule } from "@angular/platform-browser";
import { LoginService } from '../../servicios/servicios/login.service';


@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {
  vehiculos:any;
Remiseros:any;
  listado: any;
  mostrarForm:boolean;
    usuarioLogueado:any;
    nombreUsuario:any;
    unViaje:Viaje;
    form : FormGroup;
    id: number;
  mostrarListado:boolean;
  mostrarRemiseros:boolean;
  mostrarVehiculos:boolean;
  mostrarMensaje:boolean;
    public lat: Number;
    public lng: Number;
  
    RutaSeleccionada: Viaje;
    mostrarRuta:boolean = false;
  mensajeErrorFormAlta : string;
  mensajeOKFormAlta:any;
  
  direccion:string;
  dire:string;
  cliente:string;
 
  
  
  
  resultadoBusqueda: string;
  seguardo: boolean=false;

  constructor( private auth: AutService,
     public servicio:LoginService,public servicioViajes:ViajeService,formBuilder: FormBuilder) { 
       this.listarServicios();
       this.listarRemiseros();
       this.listarVehiculos();
       this.mostrarListado=true;
       this.mostrarRemiseros=false;
       this.mostrarVehiculos=false;
       this.mostrarMensaje=false;
       this.unViaje=new Viaje();
     }

  ngOnInit() {
  }

  listarServicios(){
    this.servicioViajes.ObtenerTodos()
    .then(datos => {
      this.listado = datos;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  console.log(this.listado);
  }


  listarRemiseros(){
    this.servicio.traerRemiseros()
    .then(datos => {
      this.Remiseros = datos;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  console.log(this.listado);
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
  console.log(this.listado);
  }

Asignar(viaje){
  this.mostrarListado=false;
  this.mostrarRemiseros=true;
 
  this.unViaje=viaje;
}

SeleccionarRemisero(remisero){
  this.mostrarRemiseros=false;
  this.mostrarVehiculos=true;
  this.unViaje.remisero=remisero;
}

SeleccionarVehiculo(vehiculo){
  this.mostrarVehiculos=false;
 
  this.unViaje.vehiculo=vehiculo.modelo+' '+vehiculo.color;
  this.mostrarMensaje=true;
  this.servicioViajes.Borrar(this.unViaje.id)
  .then();


}
guardar(){
  this.mostrarMensaje=false;
 
this.guardar1();
this.listarServicios();}

guardar1(){
  var formData = new FormData();
  formData.append('id',this.unViaje.id);
  formData.append('fecha', this.unViaje.fecha);
  formData.append('hora',this.unViaje.hora);
  formData.append('pago',this.unViaje.pago);
  formData.append('tipo',this.unViaje.tipo);
  formData.append('origen', this.unViaje.origen);
  formData.append('destino', this.unViaje.destino);
  formData.append('origenLatitud', this.unViaje.origenLatitud);
  formData.append('destinoLatitud', this.unViaje.destinoLatitud);
  formData.append('origenLongitud', this.unViaje.origenLongitud);
  formData.append('destinoLongitud', this.unViaje.destinoLongitud);
  formData.append('cliente', this.unViaje.cliente );
  formData.append('remisero', this.unViaje.remisero);
  formData.append('vehiculo', this.unViaje.vehiculo);
  formData.append('monto', this.unViaje.monto);
  formData.append('estado', 'SOLICITADO');
  formData.append('encuesta', 'NO');
  console.log(this.unViaje.remisero);
  console.log(this.unViaje.vehiculo);

  console.log(formData);
  console.log(this.unViaje.id);
  console.log(this.unViaje.fecha);
  console.log(this.unViaje.hora);
  console.log(this.unViaje.pago);
  console.log(this.unViaje.tipo);
  console.log(this.unViaje.origen);
  console.log(this.unViaje.destino);
  console.log(this.unViaje.origenLatitud);
  console.log(this.unViaje.destinoLatitud);
  console.log(this.unViaje.cliente);
  console.log(this.unViaje.monto);
  console.log(this.unViaje.destinoLongitud);
  console.log(this.unViaje.origenLongitud);
 
  this.servicioViajes.Modificar(formData)
  .then(datos => {
    console.log(datos);
    //this.random = Math.random();
  })
  .catch(error => {
    console.log(error);
  });
  
  this.listarServicios();
  this.mostrarListado=true;

}
cancelar(){
  this.mostrarMensaje=false;
  this.listarServicios();
  this.mostrarListado=true;
}

}
