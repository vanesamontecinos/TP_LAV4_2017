import { ArchivosjugadoresService } from '../archivosJugadores/archivosjugadores.service';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class JugadoresService {

  userFIlt : any;
  constructor(public http : Http, private archivo : ArchivosjugadoresService) { }

  public filtrar(url: string,filtro : string){
    let modo;
    if(filtro == "gano")
    modo = true;
    if(filtro == "perdio")
    modo = false;
    
    if(filtro == "todos")
    {
      return this.archivo
      .httpGetPromise(url)    
      .then(data => {return data}
      )
      .catch(this.handleError);
    }
    
    return this.archivo
    .httpGetPromise(url)    
    .then(data => {this.userFIlt = data.filter(
      data => data.gano === modo); return this.userFIlt}
    )
    .catch(this.handleError);
  }

  private extraerDatos(resp:Response) 
  {   
         
      return    resp.json() || {}; 
  }
  private handleError(error:Response | any) 
  {
      return error;
  }

}
