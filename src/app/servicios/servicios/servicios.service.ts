import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';

import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServiciosService {

  constructor(private http: Http, private servicio:MiHttpService) { }
  Agregar(cuerpo: any){
    
    
        return this.servicio.post('/servicio/',cuerpo)
      
      }

      ObtenerTodos() {
        //  return this.http.get(this.servicio.ruta+'/traerTodos')
          //  .map(response => response.json());
          return this.servicio.httpGetPromise('/servicio/');
      
      }

      Obtener(nombre) {
        return this.servicio.httpGetPromise('/servicio/'+nombre);

}  
}
