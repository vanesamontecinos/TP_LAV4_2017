import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remisero'
})
export class SinAsignarPipe implements PipeTransform {


  transform(value: any, args?: any): any {
    if(value=='0')
    {
      return "SIN ASIGNAR";
    }
    
  }

}
