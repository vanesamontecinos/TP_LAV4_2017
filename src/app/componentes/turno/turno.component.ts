import { Component, OnInit,Output } from '@angular/core';
//import { MiServicioHTTPService } from '../servicios/mi-servicio-http.service';
import { MascotaService } from '../../servicios/servicios/mascota.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { LoginService } from '../../servicios/servicios/login.service';
import { Usuario } from '../../clases/usuario';
import { AutService } from '../../servicios/servicios/aut.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  mascotas: Array<any>;
  servicios: Array<any>;
  mostrarForm: boolean = false;
  mostrarform: boolean = false;
  form : FormGroup;
  mensajeErrorFormAlta : string;
  mensajeOKFormAlta:string;
 // pathServer: string = 'http://localhost:8080/fotos/';
  random: number;
  mascota:any;
  personaSeleccionada: any;
  mostrarPersonaSeleccionada = false;
  resultadoBusqueda: string;
  mostrarResultado: boolean;
  seguardo: boolean;
nombreMascota:string;
usuarioLogueado:any;
emailLogueado:any;
unaMascotaNroFicha:any;
unaMascotaRaza:any;
unaMascotaEdad:any;
unaMascotaUsuario:any;
unaMascotaTipo:any;
unaMascotaColor:any;

  constructor(public miServicio: MascotaService, public formBuilder: FormBuilder,
    private auth: AutService) { 
    this.usuarioLogueado=this.auth.getToken();
    console.log(this.usuarioLogueado.data.clave);
    console.log(this.usuarioLogueado.data.email);
this.emailLogueado=this.usuarioLogueado.data.email;
    this.listarTodos();
    //this.listarServicios()
  }
  
    ngOnInit() {
      this.listarTodos();
    }
  
    listarTodos(){
      this.miServicio.ObtenerTodos()
      .then(datos => {
        this.mascotas = datos;
        this.random = Math.random();
      })
      .catch(error => {
        console.log(error);
      });
    console.log(this.mascotas);
    }
    Asignar(mascota){
      
        this.mostrarform = true;
        this.nombreMascota = mascota.nroficha;
        this.unaMascotaColor=mascota.color;
        this.unaMascotaEdad=mascota.edad;
        this.unaMascotaNroFicha=mascota.nroficha;
        this.unaMascotaRaza=mascota.raza;
        this.unaMascotaTipo=mascota.tipo;
        


    console.log(mascota.nroficha)
        this.form = this.formBuilder.group({
          // fecha: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
          fecha: [null, Validators.compose([Validators.required])],
          hora: [null, Validators.compose([Validators.required])],
          
        });
      }

    guardar(){
      if(this.form.get('fecha').invalid){
        this.mensajeErrorFormAlta = 'Debe seleccionar una fecha';
        return;
      }
      if(this.form.valid){
        var formData = new FormData();
     
        formData.append('nroficha', this.unaMascotaNroFicha);
        formData.append('raza', this.unaMascotaRaza);
      
        formData.append('color', this.unaMascotaColor);
        formData.append('edad', this.unaMascotaEdad);
        
        formData.append('fecha', this.form.value.fecha);
        formData.append('hora', this.form.value.hora);
        formData.append('tipo', this.unaMascotaTipo);
        formData.append('estado', "NO");

        formData.append('usuario', this.usuarioLogueado.data.email);
        
        
        console.log(formData);
      
       
        this.miServicio.AgregarServicio(formData)
        .then();
        this.mensajeOKFormAlta='Ingresado correctamente'
        this.seguardo=true;
        
        this.mensajeErrorFormAlta = '';
       // .then(() => this.mensajeOKFormAlta='Se guardo correctamente');
      
       // this.mostrarForm = false;
       //this.mensajeOKFormAlta.emit('Ingresado');
        this.form.reset();
        this.mostrarform=false;
      }
    }
  }