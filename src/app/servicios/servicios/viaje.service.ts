import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';

import { Usuario } from '../../clases/usuario';

import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ViajeService {



  miRutaIngreso: string = '/ingreso/';
  miRutaToken: string = '/tomarToken/';
  
  constructor( public miserviciohttp:MiHttpService ) { }


        
        Agregar(cuerpo: any){
          
          
              return this.miserviciohttp.http_Post('/viaje/',cuerpo)
            
            }
            AgregarEncuesta(cuerpo: any){
              
              
                  return this.miserviciohttp.http_Post('/encuesta/',cuerpo)
                
                }
                AgregarArchivos(cuerpo: any){
                  
                  
                      return this.miserviciohttp.http_Post('/encuesta/archivos',cuerpo)
                    
                    }
            AgregarVehiculo(cuerpo: any){
              
              
                  return this.miserviciohttp.http_Post('/vehiculo/',cuerpo)
                
                }
            Modificar(cuerpo: any){
              
              
              return this.miserviciohttp.http_Post('/modificar/',cuerpo)
                
                }

            ObtenerTodos() {
                  //  return this.http.get(this.servicio.ruta+'/traerTodos')
                    //  .map(response => response.json());
                    return this.miserviciohttp.get('/viaje/');
              
                }
                ObtenerEncuestas() {
                  //  return this.http.get(this.servicio.ruta+'/traerTodos')
                    //  .map(response => response.json());
                    return this.miserviciohttp.get('/encuesta/');
              
                }
                ObtenerVehiculos() {
                  //  return this.http.get(this.servicio.ruta+'/traerTodos')
                    //  .map(response => response.json());
                    return this.miserviciohttp.get('/vehiculo/');
              
                }
      Borrar(id: any){
        console.log('iddd',id);
            
            
                return this.miserviciohttp.Http_Borrar('/viaje/',id)
              
              }

              filtrado:any;
              ObtenerSolicitados() 
              {
                return this.miserviciohttp.get('/viaje/').then(data=>{
                  console.info("todos",data);             
                  this.filtrado=data;              
                  this.filtrado =this.filtrado.filter(
                    data => data.estado === 'SOLICITADO' ); return this.filtrado}
                  )
                  .catch(errror=>{console.log("error")
                return this.filtrado; 
                });
              }
              ObtenerUnViaje(id:string) 
              {
                return this.miserviciohttp.get('/viaje/').then(data=>{
                  console.info("todos",data);             
                  this.filtrado=data;              
                  this.filtrado =this.filtrado.filter(
                    data => data.id === id ); return this.filtrado}
                  )
                  .catch(errror=>{console.log("error")
                return this.filtrado; 
                });
              }
              ObtenerCancelados() 
              {
                return this.miserviciohttp.get('/viaje/').then(data=>{
                  console.info("todos",data);             
                  this.filtrado=data;              
                  this.filtrado =this.filtrado.filter(
                    data => data.estado === 'CANCELADO' ); return this.filtrado}
                  )
                  .catch(errror=>{console.log("error")
                return this.filtrado; 
                });
              }
              ObtenerRealizados() 
              {
                return this.miserviciohttp.get('/viaje/').then(data=>{
                  console.info("todos",data);             
                  this.filtrado=data;              
                  this.filtrado =this.filtrado.filter(
                    data => data.estado === 'REALIZADO' ); return this.filtrado}
                  )
                  .catch(errror=>{console.log("error")
                return this.filtrado; 
                });
              }


              traerEncuestaPreg1(algo:string) 
              {
                console.log(algo);
                return this.miserviciohttp.httpGetPromise('/encuesta/').then(data=>{
                  console.info("jugadores service",data);
                  this.filtrado=data;
                 let  pago: string;
                  this.filtrado =this.filtrado.filter(
                    data => data.trato === algo ); return this.filtrado}
                  )
                  .catch(errror=>{console.log("error")
                return this.filtrado;
                 });
              }
              traerEncuestaPreg4(algo:string) 
              {
                console.log(algo);
                return this.miserviciohttp.httpGetPromise('/encuesta/').then(data=>{
                  console.info("jugadores service",data);
                  this.filtrado=data;
                 let  pago: string;
                  this.filtrado =this.filtrado.filter(
                    data => data.precioAcorde === algo ); return this.filtrado}
                  )
                  .catch(errror=>{console.log("error")
                return this.filtrado;
                 });
              }
              traerEncuestaPreg5(algo:string) 
              {
                console.log(algo);
                return this.miserviciohttp.httpGetPromise('/encuesta/').then(data=>{
                  console.info("jugadores service",data);
                  this.filtrado=data;
                 let  pago: string;
                  this.filtrado =this.filtrado.filter(
                    data => data.recomendable === algo ); return this.filtrado}
                  )
                  .catch(errror=>{console.log("error")
                return this.filtrado;
                 });
              }

            } 
