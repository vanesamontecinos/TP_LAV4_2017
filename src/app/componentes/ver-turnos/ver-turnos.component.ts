
import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { MascotaService } from '../../servicios/servicios/mascota.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { LoginService } from '../../servicios/servicios/login.service';
import { Usuario } from '../../clases/usuario';
import { AutService } from '../../servicios/servicios/aut.service';


@Component({
  selector: 'app-ver-turnos',
  templateUrl: './ver-turnos.component.html',
  styleUrls: ['./ver-turnos.component.css']
})
export class VerTurnosComponent implements OnInit {

  mascotas: Array<any>;
  servicios: Array<any>;
  random: number;
  emailLogueado:any;
  usuarioLogueado:any;

  constructor(public miServicio: MascotaService, public formBuilder: FormBuilder,
    private auth: AutService) { 
      this.usuarioLogueado=this.auth.getToken();
      console.log(this.usuarioLogueado.data.clave);
      console.log(this.usuarioLogueado.data.email);
  this.emailLogueado=this.usuarioLogueado.data.email;
  this.listarServicios();
    }

  ngOnInit() {
  }

  listarServicios(){
    this.miServicio.ObtenerServicios()
    .then(datos => {
      this.servicios = datos;
      this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  console.log(this.servicios);
  }


  verPerros(){
    this.miServicio.traertodos('perro').then(datos => {
      this.servicios = datos;
      this.random = Math.random();
    });
  }
  verGatos(){
    this.miServicio.traertodos('gato').then(datos => {
      this.servicios = datos;
      this.random = Math.random();
    });

  }
}
