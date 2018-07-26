import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ViajeService } from '../../servicios/servicios/viaje.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/servicios/login.service';
@Component({
  selector: 'app-alta-vehiculo',
  templateUrl: './alta-vehiculo.component.html',
  styleUrls: ['./alta-vehiculo.component.css']
})
export class AltaVehiculoComponent implements OnInit {


  email: string='';
  psw:string='';
  psw2:string='';
  form : FormGroup;
  mensajeErrorFormAlta : string;
  mensajeOKFormAlta:any;
  
  
  seguardo: boolean=false;
  
  
    constructor(private route: ActivatedRoute,public servicio: ViajeService, 
      private router: Router, formBuilder: FormBuilder) { 
      this.form = formBuilder.group({
        modelo: [null, Validators.compose([Validators.maxLength(50), Validators.required])],
        anio: [null, Validators.compose([Validators.maxLength(50), Validators.required])],
        color: [null, Validators.compose([Validators.maxLength(50),  Validators.required])],
        comodidades: [null, Validators.compose([Validators.required])],
        
      });
  
  
  
    }
  
    ngOnInit() {
    }
    
  
      guardar(){ 
        this.mensajeOKFormAlta='';
    
    if (this.form.get('modelo').invalid) {
      this.mensajeErrorFormAlta = 'El modelo es obligatorio y debe estar compuesto de hasta 50 letras';
      return;
    }
  
    if (this.form.get('anio').invalid) {
      this.mensajeErrorFormAlta = 'El año es obligatorio y debe estar compuesto de numeros';
      return;
    }
    
    
    if(this.form.valid){
      //CREACION DE OBJETO FORMDATA QUE CONTENDRA LA INFO DEL FORMULARIO
      var formData = new FormData();
      //AGREGADO DE LA FOTO AL FORMADATA
      /* formData.append('foto', (<HTMLInputElement>document.getElementById('foto')).files[0]); */
      //AGREGADO DE PARES CLAVE/VALOR AL FORMDATA
      formData.append('modelo', this.form.value.modelo);
      formData.append('anio', this.form.value.anio);
      formData.append('color', this.form.value.color);
      formData.append('comodidades', this.form.value.comodidades);
      formData.append('estado', 'HABILITADO');
      //formData.append('foto', './assets/fotos/fotos/imagen1.jpg');
   
     
      this.servicio.AgregarVehiculo(formData)
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
  