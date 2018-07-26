import { AutService } from '../../servicios/servicios/aut.service';
import { ViajeService } from '../../servicios/servicios/viaje.service';
import {  FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper  } from '@agm/core';
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { Viaje } from '../../clases/viaje';
import { BrowserModule } from "@angular/platform-browser";
import { LoginService } from '../../servicios/servicios/login.service';

class TableColumn {
  field: string;
  title: string;
  type: string;
  isDisplay: boolean;
  isExport: boolean;
  valuePrepareFunction: Function;
}

@Component({
  selector: 'app-listado-viajes',
  templateUrl: './listado-viajes.component.html',
  styleUrls: ['./listado-viajes.component.css']
})
export class ListadoViajesComponent implements OnInit {

  

   
  vehiculos:any;
  Remiseros:any;
    listado: any;
    mostrarForm:boolean;
      usuarioLogueado:any;
      nombreUsuario:any;
      unViaje:Viaje;
      form : FormGroup;
      id: number;
      constructor( private auth: AutService,
        public servicio:LoginService,public servicioViajes:ViajeService,formBuilder: FormBuilder) { 
          this.listarServicios();
          
         
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

  MostrarSolicitados(){
    this.servicioViajes.ObtenerSolicitados()
    .then(datos => {
      this.listado = datos;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  }
  MostrarRealizados(){
    this.servicioViajes.ObtenerRealizados()
    .then(datos => {
      this.listado = datos;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  }
  MostrarCancelados(){
    this.servicioViajes.ObtenerCancelados()
    .then(datos => {
      this.listado = datos;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  }
}
