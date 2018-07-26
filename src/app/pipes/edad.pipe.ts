import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value<2)
    {
      return "CACHORRO";
    }else if(value>=2 && value<=8){
      return "ADULTO";
    
  }else if(value>8){
    return "VIEJO";
  }
  }

}
