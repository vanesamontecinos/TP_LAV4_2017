import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gano'
})
export class GanoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==true)
    {
      return "GANO";
    }else if(value==false){
      return "PERDIO";
    }
  }

}
