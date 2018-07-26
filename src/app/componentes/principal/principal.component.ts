import { Component, OnInit } from '@angular/core';
import { AutService } from '../../servicios/servicios/aut.service';
import { LoginService } from '../../servicios/servicios/login.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  usuarioLogueado:any;
  tipoLogueado:any;
  clienteLogueado:boolean;
  perfil:string;
  nombre:any;
  cliente:boolean;
  remisero:boolean;
  encargado:boolean;

  constructor(private auth: AutService, public servicioLogin:LoginService) { 
    this.usuarioLogueado=this.auth.getToken();
    console.log(this.usuarioLogueado.data.clave);
    console.log(this.usuarioLogueado.data.email);
    this.nombre=this.usuarioLogueado.data.nombre;
    this.perfil=this.usuarioLogueado.data.perfil;
    this.cliente=false;
    this.remisero=false;
    this.encargado=false;


/*this.servicioLogin.Obtener(this.usuarioLogueado.data.email)
.then(datos => {
  console.log(datos);
  console.log(datos.tipo);
  this.tipoLogueado=datos.tipo; 
})
.catch(error => {
  console.log(error);
});*/

if (this.perfil=='CLIENTE')
{
  this.cliente=true;
}
else if (this.perfil=='REMISERO')
{ this.remisero=true;}
else if (this.perfil=='ENCARGADO')
{ this.encargado=true;}


   }

  ngOnInit() {
  }

 

}
