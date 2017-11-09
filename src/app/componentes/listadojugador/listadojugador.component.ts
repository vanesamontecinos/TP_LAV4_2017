import { JugadoresService } from '../../servicios/jugadores/jugadores.service';
import { ArchivosjugadoresService } from '../../servicios/archivosJugadores/archivosjugadores.service';
import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { Ng2SmartTableModule,LocalDataSource } from 'ng2-smart-table';

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
  aux : any;
mostrarSmarTable:boolean;

  private source: LocalDataSource;
  private usuarios:Array<any> = [];
  // settings:any;

  constructor(private archivo : ArchivosjugadoresService, private filtro : JugadoresService) { 
    this.listar();
  //  this.aux = this.filtrar("todos");
  this.source = new LocalDataSource();
this.mostrarSmarTable=true;
  this.archivo.getUsers()
  .subscribe(
    data => this.usuarios = data,
    error => console.error("Error: " + error),
    () => this.source.load(this.usuarios)
  );
  console.log(this.usuarios);
  }

  listar()
  {
    this.archivo.httpGetPromise("usuarios.json")
    .then( data => { this.users = data;  })
    .catch( error => console.error(error) );
  }

  SmarTable(){
   this.mostrarSmarTable=true;
  }
  filtrar(modo : string)
  {
    this.filtro.filtrar("usuarios.json",modo)
    .then(data => { this.filtrado = data;console.log("data"+data);this.aux=JSON.stringify(this.filtrado);console.log("aux"+this.aux)
  
  })
    .catch(error=>console.error(error));
    console.log(this.aux);
  }
  ngOnInit() {
    this.listar();
    
    
  }
  

  filtTrue()
  {
    this.mostrarSmarTable=false;
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
    this.mostrarSmarTable=false;
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
    this.mostrarSmarTable=false;
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
  settings = {
    columns: {
      "cuit": {
        title: 'cuit'
      },
      usuario: {
        title: 'Full Name'
      },
      email: {
        title: 'User Name'
      },
      puntaje: {
        title: 'Puntaje'
      },
      fecha: {
        title: 'Fecha'
      },
      sexo: {
        title: 'Sexo'
      },
      gano: {
        title: 'Gano '
      }
    }
  };

  data = this.aux;
 // data=[{"cuit":91237256393,"usuario":"avolker0","email":"fdelamar0@wikipedia.org","puntaje":3466,"fecha":"12/03/2017","sexo":"M","gano":false},
 // {"cuit":72838602215,"usuario":"edacres1","email":"sgreedyer1@cocolog-nifty.com","puntaje":9771,"fecha":"02/03/2017","sexo":"M","gano":false},
//  ];  
// data = [
//   {
//     cuit: 1,
//     "name": "Leanne Graham",
//     username: "Bret",
//     email: "Sincere@april.biz"
//   },
//   {
//     cuit: 2,
//     name: "Ervin Howell",
//     username: "Antonette",
//     email: "Shanna@melissa.tv"
//   },
  
//   // ... list of items
  
//   {
//     cuit: 11,
//     name: "Nicholas DuBuque",
//     username: "Nicholas.Stanton",
//     email: "Rey.Padberg@rosamond.biz"
//   }
// ];
}
