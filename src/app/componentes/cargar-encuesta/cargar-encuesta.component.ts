import { Component, OnInit,ViewChild,ElementRef ,Input} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/servicios/login.service';
import { ViajeService } from '../../servicios/servicios/viaje.service';
//import { FileUploader } from 'ng2-file-upload';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-cargar-encuesta',
  templateUrl: './cargar-encuesta.component.html',
  styleUrls: ['./cargar-encuesta.component.css']
})
export class CargarEncuestaComponent implements OnInit {
  @Input() public algo:any;

  @ViewChild('fileInput') fileInput: ElementRef;
  public files: UploadFile[] = [];
  email: string='';
  psw:string='';
  psw2:string='';
  form : FormGroup;
  resolved: boolean = false;
  mensajeErrorFormAlta : string;
  mensajeOKFormAlta:any;
  mostrarForm:boolean;
  
  resolvedCaptcha(result) {
    this.resolved = true;
  }
  
  seguardo: boolean=false;
  
  
    constructor(private route: ActivatedRoute,public servicio: ViajeService,
      
      private router: Router, formBuilder: FormBuilder, public http:Http) { 

        this.mostrarForm=true;
      this.form = formBuilder.group({
        trato: [null, Validators.compose([ Validators.required])],
        horarioCumplido: [null, Validators.compose([ Validators.required])],
        vehiculoCumplido: [null, Validators.compose([ Validators.required])],
        precioAcorde: [null, Validators.compose([ Validators.required])],
        plataforma: [null, Validators.compose([  Validators.required])],
        recomendable: [null, Validators.compose([Validators.required])],
        comentarios: [null, Validators.compose([Validators.required])],
        
        medios: [null, Validators.compose([ Validators.required])],
        imagen1:[null, Validators.compose([ Validators.required])],
        imagen2:[null, Validators.compose([ Validators.required])],
       
        imagen3:[null, Validators.compose([ Validators.required])],
        
        
      });
  
  
  
    }
  
    ngOnInit() {
      console.log('lll'+this.algo);
    }
  
      guardar(){ 
        this.mensajeOKFormAlta='';
    
    //VERIFICACION DE SABOR
    if (this.form.get('trato').invalid) {
      this.mensajeErrorFormAlta = 'El nombre es obligatorio y debe estar compuesto de hasta 50 letras';
      return;
    }
  
    if (this.form.get('horarioCumplido').invalid) {
      this.mensajeErrorFormAlta = 'El Email es obligatorio y debe estar compuesto de hasta 50 letras';
      return;
    }
    //VERIFICACION DE CANTIDAD
    if(this.form.get('vehiculoCumplido').invalid){
      this.mensajeErrorFormAlta = 'La clave es obligatoria ';
      return;
    }
    if(this.form.get('plataforma').invalid){
      this.mensajeErrorFormAlta = 'Indicar que no es un robot ';
      return;
    }
    if(this.form.get('imagen1').invalid){
      this.mensajeErrorFormAlta = 'falta imagen1';
      return;
    }
    if(this.form.get('imagen2').invalid){
      this.mensajeErrorFormAlta = 'falta imagen2';
      return;
    }
    if(this.form.get('imagen3').invalid){
      this.mensajeErrorFormAlta = 'falta imagen3';
      return;
    }
    //VERIFICACION DE SEXO
    if(this.form.get('recomendable').invalid){
      this.mensajeErrorFormAlta = 'Debe seleccionar un tipo';
      return;
    }
    if(this.form.valid){
      //CREACION DE OBJETO FORMDATA QUE CONTENDRA LA INFO DEL FORMULARIO
      var formData = new FormData();
      //AGREGADO DE LA FOTO AL FORMADATA
      /* formData.append('foto', (<HTMLInputElement>document.getElementById('foto')).files[0]); */
      //AGREGADO DE PARES CLAVE/VALOR AL FORMDATA
      formData.append('trato', this.form.value.trato);
      formData.append('horarioCumplido', this.form.value.horarioCumplido);
      formData.append('vehiculoCumplido', this.form.value.vehiculoCumplido);
      formData.append('precioAcorde', this.form.value.precioAcorde);
      formData.append('plataforma', this.form.value.plataforma);
      formData.append('recomendable', this.form.value.recomendable);
      formData.append('comentarios', this.form.value.comentarios);
      formData.append('medios',this.form.value.medios);
      formData.append('cliente','cliente');
      formData.append('remisero','remisero');
      formData.append('vehiculo','vehiculo');
      formData.append('foto1', this.form.value.imagen1);
      formData.append('foto2', this.form.value.imagen2);
      formData.append('foto3',this.form.value.imagen3);
      formData.append('idViaje',this.algo);
     

      console.log(this.form.get('imagen1').value);
      console.log(this.algo);
      //formData.append('foto',/fotos/fotos/imagen1.jpg');
    
    console.log(formData);
     console.log(this.fotoSubida);
      this.servicio.AgregarEncuesta(formData)
      .then(() => this.mostrarForm=false);
      this.mensajeOKFormAlta='Ingresado correctamente'
      this.seguardo=true;
     // this.uploadImages();
      this.mensajeErrorFormAlta = '';
     // 
    
     // this.mostrarForm = false;
     //this.mensajeOKFormAlta.emit('Ingresado');
     localStorage.setItem('cliente', JSON.stringify(this.form.value.nombre));
      this.form.reset();
      
    
    }
      }


      handleDragEnter() {
        this.dragging = true;
      }
    
      handleDragLeave() {
        this.dragging = false;
      }
    
      handleDrop(e) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
      }
    
      handleImageLoad() {
        this.imageLoaded = true;
      }
      handleInputChange(e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    
        var pattern = /image-*/;
        var reader = new FileReader();
    
        if (!file.type.match(pattern)) {
          alert('invalid format');
          return;
        }
    
        this.loaded = false;
        this.inputAfectado = e.srcElement.id;
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
      }        
    
      _handleReaderLoaded(e) {
        var reader = e.target;
    
        switch (parseInt(this.inputAfectado.substring(this.inputAfectado.length - 1, this.inputAfectado.length))) {
          case 1:
            this.fotoSubida = (<HTMLInputElement>document.getElementById('file1')).files[0];
            if (!this.ValidarFoto(this.fotoSubida)) {
              alert("Cambie la imagen 1, solo se permiten imagenes de tamanio inferior a 1 MB");
              this.fotoSubida = undefined;
              return;
            } else {
              this.imageSrc = reader.result;
              console.log('kaka'+this.imageSrc);
            }
            break;
          case 2:
            this.fotoSubida2 = (<HTMLInputElement>document.getElementById('file2')).files[0];
            if (!this.ValidarFoto(this.fotoSubida2)) {
              alert("Cambie la imagen 2, solo se permiten imagenes de tamanio inferior a 1 MB");
              this.fotoSubida2 = undefined;
              return;
            } else {
              this.imageSrc2 = reader.result;
            }
    
            break;
          case 3:
            this.fotoSubida3 = (<HTMLInputElement>document.getElementById('file3')).files[0];
            debugger;
            if (!this.ValidarFoto(this.fotoSubida3)) {
              alert("Cambie la imagen 3, solo se permiten imagenes de tamanio inferior a 1 MB");
              this.fotoSubida3 = undefined;
              return;
            } else {
              this.imageSrc3 = reader.result;
              console.log(this.imageSrc3);
              debugger;
            }
    
            break;
        }
        this.loaded = true;
      }
    
      ValidarFoto(foto) {
        if (foto != undefined) {
          if (foto.size > (1024 * 1024)) {
            return false;
          }
        }
        return true;
      }
      
      dragging: boolean = false;
      loaded: boolean = false;
      imageLoaded: boolean = false;
      imageSrc: string = '';
      imageSrc2: string = '';
      imageSrc3: string = '';
      inputAfectado: string = '';
    
      fotoSubida;
      fotoSubida2;
      fotoSubida3;
      unarray4=[];
      selectedFile3: any;
      selectedFile2: any;
      selectedFile: any;
      onFileSelected(event){
        debugger;
        this.selectedFile = event.target.files[0].name;
      }
      onFileSelected2(event){
        this.selectedFile2 = event.target.files[0];
      }
      onFileSelected3(event){
        this.selectedFile3 = event.target.files[0];
      }



            onFileChange1(event) {
              if(event.target.files.length > 0) {
                let file = event.target.files[0];
                this.form.get('imagen1').setValue(file);
                console.log('file',file);

              }
            }
            onFileChange2(event) {
              if(event.target.files.length > 0) {
                let file = event.target.files[0];
                this.form.get('imagen2').setValue(file);
                console.log('file',file)
              }
            }
            onFileChange3(event) {
              if(event.target.files.length > 0) {
                let file = event.target.files[0];
                this.form.get('imagen3').setValue(file);
                console.log('file',file)
              }
            }
    }