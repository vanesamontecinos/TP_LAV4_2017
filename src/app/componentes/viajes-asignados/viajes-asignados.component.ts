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
  selector: 'app-viajes-asignados',
  templateUrl: './viajes-asignados.component.html',
  styleUrls: ['./viajes-asignados.component.css']
})
export class ViajesAsignadosComponent implements OnInit {

 
  vehiculos:any;
  Remiseros:any;
    listado: any;
    mostrarForm:boolean;
      usuarioLogueado:any;
      nombreUsuario:any;
      unViaje:Viaje;
      form : FormGroup;
      id: number;
      mostrarTabla:boolean;
      constructor( private auth: AutService,
        public servicio:LoginService,public servicioViajes:ViajeService,formBuilder: FormBuilder) { 
          this.listarServicios();
         
          this.usuarioLogueado=this.auth.getToken();
          console.log(this.usuarioLogueado.data.clave);
          console.log(this.usuarioLogueado.data.email);
          console.log(this.usuarioLogueado.data.nombre);
          this.nombreUsuario=this.usuarioLogueado.data.nombre;
          this.mostrarTabla=true;
          this.unViaje=new Viaje();
          this.mostrarForm=false;


          this.form = formBuilder.group({
            monto: [null, Validators.compose([Validators.maxLength(50), Validators.required])]
            
          });
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
  CargarPago(viaje){
//this.unViaje=new Viaje();
this.unViaje=viaje;
this.mostrarForm=true;
this.mostrarTabla=false;
console.log(this.unViaje.id);
this.servicioViajes.Borrar(this.unViaje.id)
.then();
  }
  guardar(){
    
    // this.mostrarMensaje=false;
      
    if(this.form.valid){
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
      formData.append('monto', this.form.value.monto);
      formData.append('estado', 'REALIZADO');
      formData.append('encuesta', 'NO');
      console.log(this.unViaje.remisero);
      console.log(this.unViaje.vehiculo);
      console.log(this.unViaje);
      this.servicioViajes.Modificar(formData)
      .then();
      
      this.listarServicios();
      this.mostrarTabla=true;
      this.mostrarForm=false;
    
    }
  }

}
