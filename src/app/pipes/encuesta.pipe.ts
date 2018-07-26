import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encuesta'
})
export class EncuestaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  
      if(value=='MB')
      {
        return "Muy Buena";
      }
      if(value=='M')
      {
        return "Mala";
      }
      if(value=='B')
      {
        return "Buena";
      }
      if(value=='R')
      {
        return "Regular";
      }
 
    }
}
