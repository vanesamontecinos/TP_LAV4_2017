import { Injectable } from '@angular/core';

import { MiHttpService } from './mi-http.service';

import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class MascotaService {

  constructor(private http: Http, private servicio:MiHttpService) { }

  Agregar(cuerpo: any){
    
    
        return this.servicio.post('/mascota/',cuerpo)
      
      }
  

          Obtener(nombre) {
            return this.servicio.httpGetPromise('/mascota/'+nombre);
    
}
ObtenerTodos() {
  //  return this.http.get(this.servicio.ruta+'/traerTodos')
    //  .map(response => response.json());
    return this.servicio.httpGetPromise('/mascota/');

}


AgregarServicio(cuerpo: any){
  
  
      return this.servicio.http_Post('/turno/',cuerpo)
    
    }
    ObtenerServicios() {
      //  return this.http.get(this.servicio.ruta+'/traerTodos')
        //  .map(response => response.json());
        return this.servicio.httpGetPromise('/turno/');
  
    }
    filtrado:any;
    traertodos(filtro: string) 
    {
      return this.servicio.httpGetPromise('/turno/').then(data=>{
        console.info("datos",data);
    
        this.filtrado=data;
    
     
    
        this.filtrado =this.filtrado.filter(
          data => data.tipo === filtro ); return this.filtrado}
        )
        .catch(errror=>{console.log("error")
        
    
    
      return this.filtrado;
        
    
      });
    }
    traerGatos(filtro: string) 
    {
      return this.servicio.httpGetPromise('/turno/').then(data=>{
        console.info("jugadores service",data);
    
        this.filtrado=data;
    
       let  pago: string;
        if(filtro=="pagaron")
        {
          pago= "SI";
        }
        else
        {
          pago= "NO";
        }
    
        this.filtrado =this.filtrado.filter(
          data => data.tipo === filtro ); return this.filtrado}
        )
        .catch(errror=>{console.log("error")
        
    
    
      return this.filtrado;
        
    
      });
    }
}
