import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';

import { Usuario } from '../../clases/usuario';


@Injectable()
export class LoginService {

  miRutaIngreso: string = '/ingreso/';
  miRutaToken: string = '/tomarToken/';
  unUsuario: Usuario = new Usuario();
  
  constructor( public miserviciohttp:MiHttpService ) { }

  public buscarToken(unUsuario:Usuario): Promise<string> {
    console.log(unUsuario);
        let promesaBusquedaToken: Promise<string> = new Promise((resolve,reject) =>
            {
              this.miserviciohttp.post(this.miRutaIngreso,
                                      { datosLogin: {
                                        email: unUsuario.email,
                                        clave: unUsuario.clave , 
                                        nombre: unUsuario.nombre,
                                        perfil: unUsuario.perfil  
                                      }}
                                      )
                      .then(datos=>{ console.log("Datos Busqueda:",datos);
                                     let respuesta:string;
                                     if ( datos == undefined ) 
                                      {
                                        respuesta = "sintoken";
                                      }
                                     else
                                      {
                                        respuesta = datos.token;
                                      } 
                                     resolve(respuesta);
                                   } 
                           )
                      .catch(error=>{console.log("Error Busqueda:",error);});      
            }
          )
          return promesaBusquedaToken;
        }  
        
        Agregar(cuerpo: any){
          
          
              return this.miserviciohttp.http_Post('/usuario/',cuerpo)
            
            }

            ModificarUsuario(cuerpo: any){
              
              
              return this.miserviciohttp.http_Post('/modificarUsuario/',cuerpo)
                
                }
                ModificarVehiculo(cuerpo: any){
                  
                  
                  return this.miserviciohttp.http_Post('/modificarVehiculo/',cuerpo)
                    
                    }
            Borrar(id: any){
              console.log('iddd',id);
                  
                  
                      return this.miserviciohttp.Http_Borrar('/usuario/',id)
                    
                    }
                    BorrarVehiculo(id: any){
                      console.log('iddd',id);
                          
                          
                              return this.miserviciohttp.Http_Borrar('/vehiculo/',id)
                            
                            }

            public traerJWT(): Promise<Usuario> {
              
                  let promesaTraerToken: Promise<Usuario> = new Promise((resolve,reject) =>
                      {
                        this.miserviciohttp.getJwt(this.miRutaToken,{ headers: {"miTokenParaTurno": localStorage.getItem('token')} })
                                .then(datos=>{ 
                                  
                                  console.log('token',localStorage.getItem('token'));
                                  console.log("Datos Busqueda:",datos);
                                               let unTurno: Usuario = new Usuario();                                           
                                               unTurno.nombre = datos.misDatosPorObtenerData.email;
                                               unTurno.clave = datos.misDatosPorObtenerData.clave;
                                               resolve(unTurno);
                                             } 
                                     )
                                .catch(error=>{console.log("Error Busqueda:",error);});      
                      }
                    )
                    return promesaTraerToken;
                  }  

                  Obtener(nombre) {
                    return this.miserviciohttp.httpGetPromise('/usuario/'+nombre);
            
      }  
      ObtenerTodos() {
        //  return this.http.get(this.servicio.ruta+'/traerTodos')
          //  .map(response => response.json());
          return this.miserviciohttp.httpGetPromise('/usuario/');
      
      }
      filtrado:any;
      traerRemiseros() 
      {
        return this.miserviciohttp.httpGetPromise('/usuario/').then(data=>{
          console.info("jugadores service",data);
          this.filtrado=data;
         let  pago: string;
          this.filtrado =this.filtrado.filter(
            data => data.perfil === 'REMISERO' ); return this.filtrado}
          )
          .catch(errror=>{console.log("error")
        return this.filtrado;
         });
      }
      traerClientes() 
      {
        return this.miserviciohttp.httpGetPromise('/usuario/').then(data=>{
          console.info("jugadores service",data);
          this.filtrado=data;
         let  pago: string;
          this.filtrado =this.filtrado.filter(
            data => data.perfil === 'CLIENTE' ); return this.filtrado}
          )
          .catch(errror=>{console.log("error")
        return this.filtrado;
         });
      }
      traerEncargados() 
      {
        return this.miserviciohttp.httpGetPromise('/usuario/').then(data=>{
          console.info("jugadores service",data);
          this.filtrado=data;
         let  pago: string;
          this.filtrado =this.filtrado.filter(
            data => data.perfil === 'ENCARGADO' ); return this.filtrado}
          )
          .catch(errror=>{console.log("error")
        return this.filtrado;
         });
      }
      
    }