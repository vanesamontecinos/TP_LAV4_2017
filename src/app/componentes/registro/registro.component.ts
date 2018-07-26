import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/servicios/login.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

email: string='';
psw:string='';
psw2:string='';
form : FormGroup;
resolved: boolean = false;
mensajeErrorFormAlta : string;
mensajeOKFormAlta:any;
resolvedCaptcha(result) {
  this.resolved = true;
}

seguardo: boolean=false;


  constructor(private route: ActivatedRoute,public servicio: LoginService, 
    private router: Router, formBuilder: FormBuilder) { 
    this.form = formBuilder.group({
      nombre: [null, Validators.compose([Validators.maxLength(50), Validators.required])],
      mail: [null, Validators.compose([Validators.maxLength(50), Validators.required])],
      clave: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
      captcha: [null, Validators.compose([Validators.required])],
      tipo: [null, Validators.compose([Validators.required])],
      
    });



  }

  ngOnInit() {
  }

    guardar(){ 
      this.mensajeOKFormAlta='';
  
  //VERIFICACION DE SABOR
  if (this.form.get('nombre').invalid) {
    this.mensajeErrorFormAlta = 'El nombre es obligatorio y debe estar compuesto de hasta 50 letras';
    return;
  }

  if (this.form.get('mail').invalid) {
    this.mensajeErrorFormAlta = 'El Email es obligatorio y debe estar compuesto de hasta 50 letras';
    return;
  }
  //VERIFICACION DE CANTIDAD
  if(this.form.get('clave').invalid){
    this.mensajeErrorFormAlta = 'La clave es obligatoria ';
    return;
  }
  if(this.form.get('captcha').invalid){
    this.mensajeErrorFormAlta = 'Indicar que no es un robot ';
    return;
  }
  //VERIFICACION DE SEXO
  if(this.form.get('tipo').invalid){
    this.mensajeErrorFormAlta = 'Debe seleccionar un tipo';
    return;
  }
  if(this.form.valid){
    //CREACION DE OBJETO FORMDATA QUE CONTENDRA LA INFO DEL FORMULARIO
    var formData = new FormData();
    //AGREGADO DE LA FOTO AL FORMADATA
    /* formData.append('foto', (<HTMLInputElement>document.getElementById('foto')).files[0]); */
    //AGREGADO DE PARES CLAVE/VALOR AL FORMDATA
    formData.append('nombre', this.form.value.nombre);
    formData.append('email', this.form.value.mail);
    formData.append('clave', this.form.value.clave);
    formData.append('tipo', this.form.value.tipo);
    formData.append('estado', 'HABILITADO');
    //formData.append('foto', './assets/fotos/fotos/imagen1.jpg');
    console.log(this.form.value.nombre);
    console.log(this.form.value.clave);
    console.log(this.form.value.tipo);
  console.log(formData);
   
    this.servicio.Agregar(formData)
    .then();
    this.mensajeOKFormAlta='Ingresado correctamente'
    this.seguardo=true;
    
    this.mensajeErrorFormAlta = '';
   // .then(() => this.mensajeOKFormAlta='Se guardo correctamente');
  
   // this.mostrarForm = false;
   //this.mensajeOKFormAlta.emit('Ingresado');
   localStorage.setItem('cliente', JSON.stringify(this.form.value.nombre));
    this.form.reset();
    this.router.navigateByUrl("/Ingreso");

  
  }
    }
   
  }