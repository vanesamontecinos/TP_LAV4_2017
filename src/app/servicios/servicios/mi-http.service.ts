import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiHttpService {

 // miUrl: string = "http://localhost:8080/api2862018" ; 
  miUrl: string = "http://tpvanesamontecinos.atwebpages.com/api2862018" ; 
  constructor (public http:Http, private authHttp: AuthHttp) { }

  get(unaRuta:string){
    
        return this.http.get(this.miUrl+unaRuta)
        .toPromise()
        .then(this.extractData).catch(this.manejadorError);
    
      }
  
  delete(unaRuta:string){
        //console.log("Te doy una promesa baja:",unaUrl);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.miUrl+unaRuta,options).toPromise().then(this.extraerDatos).catch(this.manejadorError);
      }    
      
  post(unaRuta:string, data: Object)
  {
    return this.http.post(this.miUrl+unaRuta, data)
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  public http_Post(url:string,cuerpo:any){
  
    return this.http.post(this.miUrl+url, cuerpo)
   // return this.http.post(this.miUrl+url, cuerpo)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }
/**
 * Wrapper de HTTP que envia el token en la cabecera.
 * Para hacer peticines autenticado.
 * @param user 
 */
  getJwt(unaRuta:string, user: Object)
  {
    return this.http.get(this.miUrl+unaRuta, user)

   
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  /*getJwt(unaRuta:string, user: Object)
  {
    return this.authHttp.get(this.miUrl+unaRuta, user)

   
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }*/

manejadorError(error:Response|any){
  //return error;
  console.error(error.message || error);
  return Promise.reject(error.message || error);
}

extraerDatos(respuesta:Response){
  return respuesta.json()||{};
}

private extractData(res: Response) {
  let body = res.json();    
  
  return body || { };
}

private handleError (error: Response | any) {
  // In a real world app, you might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
 // console.error( errMsg );
  console.error( 'CATCH'+error );
  //return Observable.throw(errMsg);
}    

public Http_Borrar(url:string,id:any){
  //REQUESTOPTIONS SIRVE PARA PASAR PARAMETROS CON HTTP
  let requestOptions = new RequestOptions({
    body : {"id" : id}
  });
  //return this.http.delete(this.miUrl+url, requestOptions).toPromise().then(this.extraerDatos);
  return this.http.delete(this.miUrl+url, requestOptions)
  // return this.http.post(this.miUrl+url, cuerpo)
   .toPromise()
   .then(this.extraerDatos)
   .catch(this.handleError);
}

public httpGetPromise(url: string){
  
  
      return this.http
      .get(this.miUrl+url)
      .toPromise()
      .then(this.extraerDatos)
      .catch(this.handleError);
    }
    public httpPut(url: string,cuerpo:any){
      
      
      return this.http.put(this.miUrl+url, cuerpo)
      // return this.http.post(this.miUrl+url, cuerpo)
       .toPromise()
       .then(this.extraerDatos)
       .catch(this.handleError);
        }

}
