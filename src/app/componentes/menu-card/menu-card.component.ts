
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AutService } from '../../servicios/servicios/aut.service';
import { LoginService } from '../../servicios/servicios/login.service';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {
  usuarioLogueado:any;
  tipoLogueado:any;
  clienteLogueado:boolean=false;
  perfil:string;
  nombre:any;
  cliente:boolean;
  remisero:boolean;
  encargado:boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,private auth: AutService, public servicioLogin:LoginService) {

      this.usuarioLogueado=this.auth.getToken();
      console.log(this.usuarioLogueado.data.clave);
      console.log(this.usuarioLogueado.data.email);
      this.nombre=this.usuarioLogueado.data.nombre;
      this.perfil=this.usuarioLogueado.data.perfil;
      this.cliente=false;
      this.remisero=false;
      this.encargado=false;
  
  
  if (this.perfil=='CLIENTE')
  {
    this.cliente=true;
  }
  else if (this.perfil=='REMISERO')
  { this.remisero=true;}
  else if (this.perfil=='ENCARGADO')
  { this.encargado=true;}

      this.usuarioLogueado=this.auth.getToken();
      console.log(this.usuarioLogueado.data.clave);
      console.log(this.usuarioLogueado.data.email);
      if (this.usuarioLogueado.data.perfil=="free")
      {
        this.clienteLogueado=true;
      }
  
  /*
  this.servicioLogin.Obtener(this.usuarioLogueado.data.email)
  .then(datos => {
    console.log(datos);
    console.log(datos.perfil);
    this.tipoLogueado=datos.perfil; 
    if (datos.perfil=="free")
    {
      this.clienteLogueado=true;
    }
  })
  .catch(error => {
    console.log(error);
  });*/
  /*console.log('tipolog'+this.tipoLogueado);
  if (this.tipoLogueado=="cliente")
  {
    this.clienteLogueado=true;
  }
  else {this.clienteLogueado=false;}*/

//this.clienteLogueado=false;

     }
  
     

  ngOnInit() {
  }
nada(){}
  Principal(tipo: string) {
    switch (tipo) {
      case 'AltaServicio':
          this.router.navigate(['/Principal/AltaServicio']);
        break;
      case 'AltaTurno':
          this.router.navigate(['/Principal/AltaTurno']);
        break;
      case 'VerTurnos':
          this.router.navigate(['/Principal/VerTurnos']);
        break;
      case 'SmartTable':
          this.router.navigate(['/Principal/SmartTable']);
        break;
        case 'AltaViaje':
        this.router.navigate(['/Principal/AltaViaje']);
      break;
      case 'Informes':
      this.router.navigate(['/Principal/Informes']);
    break;
    case 'SmartTable':
    this.router.navigate(['/Principal/SmartTable']);
  break;
      case 'Ruta':
      this.router.navigate(['/Principal/Ruta']);
    break;
    case 'Listado':
    this.router.navigate(['/Principal/Listado']);
  break;
  case 'Alta':
  this.router.navigate(['/Principal/Alta']);
break;
case 'Asignar':
this.router.navigate(['/Principal/Asignar']);
break;
case 'AltaVehiculo':
this.router.navigate(['/Principal/AltaVehiculo']);
break;
case 'ListadoViajes':
this.router.navigate(['/Principal/ListadoViajes']);
break;
case 'ViajesAsignados':
this.router.navigate(['/Principal/ViajesAsignados']);
break;
case 'CargarEncuesta':
this.router.navigate(['/Principal/CargarEncuesta']);
break;
       
    }
  }

}
