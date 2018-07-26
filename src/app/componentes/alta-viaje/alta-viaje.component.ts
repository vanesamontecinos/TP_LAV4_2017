import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ViajeService } from '../../servicios/servicios/viaje.service';
import {  FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
//import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { DirectionsMapDirective } from '../../directivas/googlr-map.directive';
import {} from '@types/googlemaps';
import { AutService } from '../../servicios/servicios/aut.service';

import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input ,ChangeDetectorRef} from '@angular/core';

import { Router } from '@angular/router';
import { Viaje } from '../../clases/viaje';
import {} from '@types/googlemaps';

declare var google:any;
declare var jQuery:any;

import {} from 'googlemaps';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper  } from '@agm/core';

@Component({
  selector: 'app-alta-viaje',
  templateUrl: './alta-viaje.component.html',
  styleUrls: ['./alta-viaje.component.css']
})
export class AltaVIajeComponent implements OnInit {

  //nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  numeroUno:number;
  numeroDos:any;
  operador:number;
  eloperador:any;
  repetidor:any;
  resultado:number;
  numeroIngresado:number;
  private origenLat: any;
  private origenLng: any;
  private destinoLat: any;
  private destinoLng: any;
  distanciakm:any;
  calculado:boolean;
  costoCalculado:any;
  //private subscription: Subscription;

  public latitude: number;
  public longitude: number;
  public destinationInput: FormControl;
  public destinationOutput: FormControl;
  public zoom: number;
  public iconurl: string;
  public mapCustomStyles : any;
  public estimatedTime: any;
  public estimatedDistance: any;
  //public algo:google.maps.places.PlaceResult;

  @ViewChild("pickupInput")
  public pickupInputElementRef: ElementRef;

   @ViewChild("pickupOutput")
  public pickupOutputElementRef: ElementRef;

   @ViewChild("scrollMe")
  private scrollContainer: ElementRef;

  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
  
  public origin :any ; // its a example aleatory position
  public destination : any; // its a example aleatory position
  form : FormGroup;
  
  mensajeErrorFormAlta : string;
  mensajeOKFormAlta:any;
  coordenadas:string;
  direccion:string;
  dire:string;
  cliente:string;


  pizzas: Array<any>;
 
  pizzaSeleccionada: any;
  mostrarPizzaSelecionada = false;
  resultadoBusqueda: string;
  seguardo: boolean=false;

 
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

origen: google.maps.LatLng;
destino: google.maps.LatLng;
usuarioLogueado:any;
nombreUsuario:any;
  public searchControl: FormControl;
  
 
 @ViewChild("search")
  public searchElementRef: ElementRef;


  constructor(public servicio:ViajeService , formBuilder: FormBuilder,
     private auth: AutService,private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { 
     this.calculado=false;
      
   



      this.usuarioLogueado=this.auth.getToken();
      console.log(this.usuarioLogueado.data.clave);
      console.log(this.usuarioLogueado.data.email);
      this.nombreUsuario=this.usuarioLogueado.data.email;

    this.form = formBuilder.group({
    
      origen: [null, Validators.compose([Validators.maxLength(250),  Validators.required])],
      destino: [null, Validators.compose([Validators.maxLength(250),  Validators.required])],
      fecha: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      hora: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      pago: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      tipo: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      

 
    
    });

this.ngOnInit();
  }

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;


    this.setCurrentPosition();

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

 

  getDistanceAndDuration(){
   // this.estimatedTime = this.vc.estimatedTime;
  //  this.estimatedDistance = this.vc.estimatedDistance;
  }

  scrollToBottom(): void {
    jQuery('html, body').animate({ scrollTop: jQuery(document).height() }, 3000);
  }
  private setPickUpLocation( place:any ) {
    //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private getMapCusotmStyles() {
    // Write your Google Map Custom Style Code Here.
  }
  calculateDistance() {
    const nyc = new google.maps.LatLng(this.latitudDesde,this.longitudDesde);
    const london = new google.maps.LatLng(this.latitudHasta, this.longitudHasta);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(nyc, london);
    this.distanciakm=(google.maps.geometry.spherical.computeDistanceBetween(nyc, london)/ 1000).toFixed(2);
    console.log(distance);
    console.log('km'+this.distanciakm);
    this.costoCalculado=this.distanciakm*30;
  }

  calcular(){
    if(this.latitudDesde && this.latitudHasta){
    this.calculado=true;
    this.calculateDistance();
    }
  }
  cancelar(){
    this.router.navigate(['/Principal/Menu']);
  }
  guardar(){ 
    this.calculateDistance();
   // this.vc.origin = { longitude: this.longitudDesde, latitude: this.latitudDesde };
   // this.vc.originPlaceId = place.place_id;
  
 // this.vc.destinationPlaceId = place.place_id;
   // this.getDistanceAndDuration();
  // this.calculateDistance()
    this.mensajeOKFormAlta='';
console.log('ssss'+this.estimatedTime+'dis0'+this.estimatedDistance);
//VERIFICACION DE SABOR


if(this.form.valid){
  //CREACION DE OBJETO FORMDATA QUE CONTENDRA LA INFO DEL FORMULARIO
  var formData = new FormData();
  formData.append('fecha', this.form.value.fecha);
  formData.append('hora',this.form.value.hora);
  formData.append('pago',this.form.value.pago);
  formData.append('tipo',this.form.value.tipo);
  formData.append('origen', this.direccionDesde);
  formData.append('destino', this.direccionHasta);
  formData.append('origenLatitud', this.origenLatitud);
  formData.append('destinoLatitud', this.destinoLatitud);
  formData.append('origenLongitud', this.origenLongitud);
  formData.append('destinoLongitud', this.destinoLongitud);
  formData.append('cliente', this.usuarioLogueado.data.email );
  formData.append('remisero', 'SIN ASIGNAR');
  formData.append('vehiculo', 'SIN ASIGNAR');
  formData.append('monto', this.costoCalculado);
  formData.append('estado', 'SOLICITADO');
  formData.append('encuesta', 'NO');
 //formData.append('coordenadasGPS', this.coordenadas);
  console.log(formData);
  console.log(this.form.value.fecha);
  console.log(this.form.value.hora);
  console.log(this.form.value.pago);
  console.log(this.form.value.tipo);
  console.log(this.direccionDesde);
  console.log(this.direccionHasta);
  console.log(this.origenLatitud);
  console.log(this.destinoLatitud);
  console.log(this.origenLongitud);
  console.log(this.destinoLongitud);
  this.servicio.Agregar(formData)
  .then(() => this.mensajeOKFormAlta='Se guardo correctamente');
  //this.mensajeOKFormAlta='Ingresado correctamente'
  this.seguardo=true;
  
  this.mensajeErrorFormAlta = '';
 // .then(() => this.mensajeOKFormAlta='Se guardo correctamente');

 // this.mostrarForm = false;
 //this.mensajeOKFormAlta.emit('Ingresado');
  this.form.reset();
  this.dire='';
  this.coordenadas='';
}}



 
  mySplit(string, nb){
    var array = string.split(' ');
    return array[nb];}

}




