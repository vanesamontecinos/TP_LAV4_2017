
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/servicios/login.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

 
email: string='';
psw:string='';
psw2:string='';
form : FormGroup;
mensajeErrorFormAlta : string;
mensajeOKFormAlta:any;


seguardo: boolean=false;


  constructor(private route: ActivatedRoute,public servicio: LoginService, 
    private router: Router, formBuilder: FormBuilder) { 
    this.form = formBuilder.group({
      nombre: [null, Validators.compose([Validators.maxLength(50), Validators.required])],
      mail: [null, Validators.compose([Validators.maxLength(50), Validators.required])],
    //  clave: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
    //  tipo: [null, Validators.compose([Validators.required])],
      
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
  
  
  if(this.form.valid){
    //CREACION DE OBJETO FORMDATA QUE CONTENDRA LA INFO DEL FORMULARIO
    var formData = new FormData();
    //AGREGADO DE LA FOTO AL FORMADATA
    /* formData.append('foto', (<HTMLInputElement>document.getElementById('foto')).files[0]); */
    //AGREGADO DE PARES CLAVE/VALOR AL FORMDATA
    formData.append('nombre', this.form.value.nombre);
    formData.append('email', this.form.value.mail);
    formData.append('clave', '123456');
    formData.append('tipo', 'REMISERO');
    formData.append('estado', 'HABILITADO');
    //formData.append('foto', './assets/fotos/fotos/imagen1.jpg');
    console.log(this.form.value.nombre);
    //console.log(this.form.value.clave);
   // console.log(this.form.value.tipo);
  console.log(formData);
   
    this.servicio.Agregar(formData)
    .then();
    this.mensajeOKFormAlta='Ingresado correctamente'
    this.seguardo=true;
    
    this.mensajeErrorFormAlta = '';
   // .then(() => this.mensajeOKFormAlta='Se guardo correctamente');
  
   // this.mostrarForm = false;
   //this.mensajeOKFormAlta.emit('Ingresado');
   //localStorage.setItem('cliente', JSON.stringify(this.form.value.nombre));
    this.form.reset();
   // this.router.navigateByUrl("/Login");

  
  }
    }
    volver(){
      this.router.navigate(['/Principal/ListadoUsuarios']);
    }
   
  }
