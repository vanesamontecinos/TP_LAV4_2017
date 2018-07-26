
import { AutService } from '../../servicios/servicios/aut.service';
import { ViajeService } from '../../servicios/servicios/viaje.service';
import {  FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {} from 'googlemaps';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper  } from '@agm/core';
import { Viaje } from '../../clases/viaje';

import {} from '@types/googlemaps';

declare var google:any;
declare var jQuery:any;

import {} from 'googlemaps';

import { BrowserModule } from "@angular/platform-browser";
//import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { DirectionsMapDirective } from '../../directivas/googlr-map.directive';
import {} from '@types/googlemaps';

import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input ,ChangeDetectorRef} from '@angular/core';

import { Router } from '@angular/router';




@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
 // @Input()
  listado: any;
mostrarForm:boolean;
  usuarioLogueado:any;
  nombreUsuario:any;
  unViaje:Viaje;
  form : FormGroup;
  id: number;
  mostrarEncuesta:boolean;

  public lat: Number;
  public lng: Number;

  RutaSeleccionada: Viaje;
  mostrarRuta:boolean = false;
 
direccionDesde:string;
direccionHasta:string;
latitudDesde:number;
longitudDesde:number;
latitudHasta:number;
longitudHasta:number;
origenLatitud:string;
origenLongitud:string;
destinoLatitud:string;
destinoLongitud:string;
public latitude: number;
public longitude: number;
public destinationInput: FormControl;
public destinationOutput: FormControl;
public zoom: number;
public iconurl: string;
public mapCustomStyles : any;
public estimatedTime: any;
public estimatedDistance: any;
coordenadas:any;

origen: google.maps.LatLng;
destino: google.maps.LatLng;
@ViewChild("pickupInput")
public pickupInputElementRef: ElementRef;

 @ViewChild("pickupOutput")
public pickupOutputElementRef: ElementRef;

 @ViewChild("scrollMe")
private scrollContainer: ElementRef;

@ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;



@ViewChild("search")
public searchElementRef: ElementRef;

//@ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

//public algo:google.maps.places.PlaceResult;


public origin :any ; // its a example aleatory position
public destination : any; // its a example aleatory position


mensajeErrorFormAlta : string;
mensajeOKFormAlta:any;

direccion:string;
dire:string;
cliente:string;


pizzas: Array<any>;

pizzaSeleccionada: any;
mostrarPizzaSelecionada = false;
resultadoBusqueda: string;
seguardo: boolean=false;

public drivingOptions: any = {
  departureTime: new Date('2018/05/20 13:14'),
  arrivalTime: new Date('2018/05/20 13:30'),
  modes: ['BUS'],
}


  constructor( private auth: AutService,
    
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, public servicio:ViajeService,formBuilder: FormBuilder) {
    this.usuarioLogueado=this.auth.getToken();
    console.log(this.usuarioLogueado.data.clave);
    console.log(this.usuarioLogueado.data.email);
    this.nombreUsuario=this.usuarioLogueado.data.email;

   this.listarServicios();
   this.mostrarForm=false;
   this.unViaje=new Viaje();
  this.mostrarEncuesta=false;
  this.mostrarRuta=false;
   this.form = formBuilder.group({
    
      origen: [null, Validators.compose([Validators.maxLength(150),  Validators.required])],
      destino: [null, Validators.compose([Validators.maxLength(150),  Validators.required])],
      fecha: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      hora: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      pago: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      tipo: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],

 
    
    });

   }
public seleccion:any;
 CargarEncuesta(algo){
  this.unViaje=algo;
   this.mostrarEncuesta=true;
   this.seleccion = algo.id;
   this.servicio.Borrar(algo.id)
   .then();
   this.agregoEncuesta();


  }
   agregoEncuesta(){
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
    formData.append('cliente', this.unViaje.cliente);
    formData.append('remisero', this.unViaje.remisero);
    formData.append('vehiculo', this.unViaje.vehiculo);
    formData.append('monto', this.unViaje.monto);
    formData.append('estado', this.unViaje.estado);
    formData.append('encuesta', 'SI');
    console.log(this.unViaje);
 
    this.servicio.Modificar(formData)
    .then(datos => {
      console.log('nanan'+datos);
      this.listarServicios();
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
    

   }
   

 
   VerRuta(algo){
    this.mostrarRuta = true;
    this.RutaSeleccionada=new Viaje();
    this.RutaSeleccionada = algo;
    this.latitudDesde= parseFloat(algo.origenLatitud);
    this.longitudDesde= parseFloat(algo.origenLongitud);
    this.latitudHasta=parseFloat(algo.destinoLatitud);
    this.longitudHasta=parseFloat(algo.destinoLongitud);
    console.log(this.longitudDesde);
  //  let place:google.maps.places.
  this.origin = { lat:this.latitudDesde, lng:this.longitudDesde }
  this.destination = { lat:this.latitudHasta, lng: this.longitudHasta }
 this.direccionDesde=algo.origen;
 this.direccionHasta=algo.destino;

  }
  listarServicios(){
    this.servicio.ObtenerTodos()
    .then(datos => {
      this.listado = datos;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  console.log(this.listado);
  }


  Modificar(algo){
    this.mostrarForm=true;
    this.unViaje=algo;
    this.id=algo.id;
    this.servicio.Borrar(algo.id)
    .then();
    console.log('dddd',this.unViaje.id);
   // this.comienzo();
   
    

  }

  Cancelar(algo){
    this.mostrarRuta=false;
    this.unViaje=algo;
    this.id=algo.id;
    this.servicio.Borrar(algo.id)
    .then();
    this.listarServicios();
    this.IngresarCancelado();
  }
  IngresarCancelado(){
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
    formData.append('cliente', this.unViaje.cliente);
    formData.append('remisero', this.unViaje.remisero);
    formData.append('vehiculo', this.unViaje.vehiculo);
    formData.append('monto', '0');
    formData.append('estado', 'CANCELADO');
    formData.append('encuesta', 'NO');
    console.log(this.unViaje);
 
    this.servicio.Modificar(formData)
    .then(datos => {
      console.log('nanan'+datos)
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
    this.listarServicios();
  }
    
  guardar(){
  

if(this.form.valid){
  //CREACION DE OBJETO FORMDATA QUE CONTENDRA LA INFO DEL FORMULARIO
  var formData = new FormData();
  //AGREGADO DE LA FOTO AL FORMADATA
  /* formData.append('foto', (<HTMLInputElement>document.getElementById('foto')).files[0]); */
  //AGREGADO DE PARES CLAVE/VALOR AL FORMDATA
 // this.cliente=JSON.parse(localStorage.getItem('cliente'));
  //formData.append('cliente', 'this.cliente');

 formData.append('id',this.unViaje.id);
  formData.append('fecha', this.form.value.fecha);
  formData.append('hora',this.form.value.hora);
  formData.append('pago',this.form.value.pago);
  formData.append('tipo',this.form.value.tipo);
  formData.append('origen', this.unViaje.origen);
  formData.append('destino', this.unViaje.destino);
  formData.append('origenLatitud', this.unViaje.origenLatitud);
  formData.append('destinoLatitud', this.unViaje.destinoLatitud);
  formData.append('origenLongitud', this.unViaje.origenLongitud);
  formData.append('destinoLongitud', this.unViaje.destinoLongitud);
  formData.append('cliente', this.usuarioLogueado.data.email );
  formData.append('remisero', '0');
  formData.append('vehiculo', '0');
  formData.append('monto', '0');
  formData.append('estado', 'SOLICITADO');
  formData.append('encuesta', 'NO');
 //formData.append('coordenadasGPS', this.coordenadas);
  console.log(formData);
  console.log(this.unViaje.id);
  console.log(this.form.value.fecha);
  console.log(this.form.value.hora);
  console.log(this.form.value.pago);
  console.log(this.form.value.tipo);
  console.log(this.unViaje.origen);
  console.log(this.unViaje.destino);
  console.log(this.unViaje.origenLatitud);
  console.log(this.unViaje.destinoLatitud);
  console.log(this.usuarioLogueado.data.email);
  console.log(this.unViaje.destinoLongitud);
  console.log(this.unViaje.origenLongitud);
  this.servicio.Modificar(formData)
  .then();
 
  this.mensajeOKFormAlta='Ingresado correctamente'
  this.seguardo=true;
  
  this.mensajeErrorFormAlta = '';

  this.form.reset();
  this.dire='';
  this.coordenadas='';
}
this.listarServicios();
this.mostrarForm=false;

  }


  ngOnInit() {
    this.listarServicios();}
    comienzo(){
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;


   // this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place.formatted_address);
          
          
          this.direccionDesde=place.formatted_address;

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.origen= new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
          console.log(this.origen);
         
          this.latitudDesde = place.geometry.location.lat();
          this.longitudDesde = place.geometry.location.lng();
          this.origenLatitud=this.latitudDesde+'';
          this.origenLongitud=this.longitudDesde+'';;
          
          this.zoom = 12;
          console.log(this.latitude,this.longitude);
          this.coordenadas=this.latitude+' '+this.longitude;
          
        });
      });
    });


    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place.formatted_address);
          
          this.direccionHasta=place.formatted_address;

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.destino= new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
          console.log(this.destino);
          this.latitudHasta = place.geometry.location.lat();
          this.longitudHasta = place.geometry.location.lng();
          this.zoom = 12;
          this.destinoLatitud=this.latitudHasta+'';
          this.destinoLongitud=this.longitudHasta+'';
          console.log(this.latitudHasta,this.longitudHasta);
          this.coordenadas=this.latitude+' '+this.longitude;
          
           
          
        });

        
 

  
      });
    });

  }
  //this.setCurrentPosition();
empezar(){
  this.mapsAPILoader.load().then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
      types: ["address"]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place.formatted_address);
        this.unViaje.origen=place.formatted_address;

        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        //set latitude, longitude and zoom
        this.origen= new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
        console.log(this.origen);
        this.latitudDesde = place.geometry.location.lat();
        this.longitudDesde = place.geometry.location.lng();
        this.unViaje.origenLatitud=this.latitudDesde+'';
        this.unViaje.origenLongitud=this.longitudDesde+'';;
        
        this.zoom = 12;
        console.log(this.latitude,this.longitude);
        this.coordenadas=this.latitude+' '+this.longitude;
        
      });
    });
  });


  this.mapsAPILoader.load().then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
      types: ["address"]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place.formatted_address);
        this.unViaje.destino=place.formatted_address;

        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        //set latitude, longitude and zoom
        this.destino= new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
        console.log(this.destino);
        this.latitudHasta = place.geometry.location.lat();
        this.longitudHasta = place.geometry.location.lng();
        this.zoom = 12;
        this.unViaje.destinoLatitud=this.latitudHasta+'';
        this.unViaje.destinoLongitud=this.longitudHasta+'';
        console.log(this.latitudHasta,this.longitudHasta);
        this.coordenadas=this.latitude+' '+this.longitude;
        
      });
    });
  });

}

volver(){
  this.mostrarForm=false;
  
 this.mostrarEncuesta=false;
 this.mostrarRuta=false;

}
}
