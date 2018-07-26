import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit {

  @Input() ruta:any;

  title: string = 'My first AGM project';
  slat: number = 51.678418;
  slng: number = 7.809007;
  lat2: number = 51.678422;
  lng2: number = 7.809040;

  public lat: Number = 24.799448
  public lng: Number = 120.979021
   
  public lat1: Number;
    public lng1: Number;

  public origin: {}
  public destination: {}
   
  nombre:any;
  constructor() {
    this.nombre=this.ruta.estado;
   // this.lat1=this.ruta.origenLatitud;
   // this.lng1=this.ruta.origenLongitud;
   }

  ngOnInit() {
    this.getDirection()
  }
   
  getDirection() {

   // this.origin = { lat: 24.799448, lng: 120.979021 }
    this.origin = { lat:this.lat1, lng:this.lng1 }
    this.destination = { lat: 24.799524, lng: 120.975017 }
   
    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'
  }

}
