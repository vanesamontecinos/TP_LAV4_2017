import { JugadoresService } from '../../servicios/jugadores/jugadores.service';
import { ArchivosjugadoresService } from '../../servicios/archivosJugadores/archivosjugadores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listadojugador',
  templateUrl: './listadojugador.component.html',
  styleUrls: ['./listadojugador.component.css']
})
export class ListadojugadorComponent implements OnInit {

  users : any;
  mostrar : boolean = true;
  motrarFilt : boolean = true;
  filtrado : any;

  constructor(private archivo : ArchivosjugadoresService, private filtro : JugadoresService) { 
    this.listar();
  }

  listar()
  {
    this.archivo.httpGetPromise("usuarios.json")
    .then( data => { this.users = data; })
    .catch( error => console.error(error) );
  }
  filtrar(modo : string)
  {
    this.filtro.filtrar("usuarios.json",modo)
    .then(data => { this.filtrado = data})
    .catch(error=>console.error(error));
  }
  ngOnInit() {
    this.listar();
    
    
  }
  filtTrue()
  {
    this.filtrar("gano"); 
    
    this.mostrar = true;
    if(this.motrarFilt == false)
    {
      this.motrarFilt = true;
    }  
    else
    {
      this.motrarFilt = false;
    }
   

    console.log(this.filtrado);
  }
  filtFalse()
  {
    this.filtrar("perdio"); 
    
    this.mostrar = true;
    if(this.motrarFilt == false)
    {
      this.motrarFilt = true;
    }  
    else
    {
      this.motrarFilt = false;
    }
   

    console.log(this.filtrado);
  }
  Show()
  {
    this.filtrar("todos"); 
    
    this.mostrar = true;
    if(this.motrarFilt == false)
    {
      this.motrarFilt = true;
    }  
    else
    {
      this.motrarFilt = false;
    }
   

    console.log(this.filtrado);
  }
}
