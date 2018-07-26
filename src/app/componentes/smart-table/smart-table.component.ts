
import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { MascotaService } from '../../servicios/servicios/mascota.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import { LoginService } from '../../servicios/servicios/login.service';
import { ViajeService } from '../../servicios/servicios/viaje.service';
import { Usuario } from '../../clases/usuario';
import { AutService } from '../../servicios/servicios/aut.service';
import { Ng2SmartTableModule,LocalDataSource } from 'ng2-smart-table';



class TableColumn {
  field: string;
  title: string;
  type: string;
  isDisplay: boolean;
  isExport: boolean;
  valuePrepareFunction: Function;
}

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit {

  columnMap: Map<string,TableColumn> = new Map<string,TableColumn>();
 
  defaultSettings = {
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      display: true,
      perPage: 50
    }
  };
  
  mascotas: Array<any>;
  servicios: Array<any>;
  random: number;
  emailLogueado:any;
  usuarioLogueado:any;


  users : any;
  mostrar : boolean = true;
  motrarFilt : boolean = true;
  filtrado : any;
  aux : any;
mostrarSmarTable:boolean;

  private source: LocalDataSource;
  private usuarios:Array<any> = [];


  constructor(public miServicio: ViajeService, public formBuilder: FormBuilder,
    private auth: AutService) { 
      this.usuarioLogueado=this.auth.getToken();
      console.log(this.usuarioLogueado.data.clave);
      console.log(this.usuarioLogueado.data.email);
  this.emailLogueado=this.usuarioLogueado.data.email;
  this.source = new LocalDataSource();
  this.listarServicios();
  this.prepareColumnMap();
    }

  ngOnInit() {
   // this.settings = _.merge(this.defaultSettings, this.settings);
  }

  listarServicios(){
    this.miServicio.ObtenerTodos()
    .then(datos => {
      this.servicios = datos;
      this.source.load(this.servicios)
      this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  console.log(this.servicios);
  }


  MostrarRealizados(){
    this.miServicio.ObtenerRealizados().then(datos => {
      this.servicios = datos;
      this.source.load(this.servicios)
      this.random = Math.random();
    });
  }
  MostrarCancelados(){
    this.miServicio.ObtenerCancelados().then(datos => {
      this.servicios = datos;
      this.source.load(this.servicios)
      this.random = Math.random();
    });

  }
  MostrarSolicitados(){
    this.miServicio.ObtenerSolicitados().then(datos => {
      this.servicios = datos;
      this.source.load(this.servicios)
      this.random = Math.random();
    });

  }


  settings = {
    columns: {
      usuario: {
        title: 'Cliente'
      },
      fecha: {
        title: 'fecha'
      },
      hora: {
        title: 'Hora'
      },
      origen: {
        title: 'origen'
      },
      destino: {
        title: 'destino'
      },
      remisero: {
        title: 'remisero'
      },
     
      vehiculo: {
        title: 'vehiculo'
      },
      estado: {
        title: 'Estado'
      },
      tipo: {
        title: 'Tipo'
      }
    }
  };

  data = this.aux;




  
  export2Csv(): void {
    
        const columns: TableColumn[] = Array.from(this.columnMap.values());
    
        let encodedStr = columns.reduce((acct, current: TableColumn) => {
    
          if (current.isExport != false) {
            return acct += '"' + current.title + '",';
          }
          else {
            return acct;
          }
        }, '');
        encodedStr = encodedStr.slice(0, -1);
        encodedStr += '\r\n';
    
        let fields: string[] = columns.reduce((acct, column: TableColumn) => {
    
          if (column.isExport != false) {
            acct.push(column.field);
          }
          return acct;
        }, []);
    
        this.source.getAll().then((rows) => {
    
          rows.forEach((row) => {
            fields.forEach((field) => {
              if (row.hasOwnProperty(field)) {
                let value = row[field];
    
                if (!value) {
                  value = "";
                }
                let valuePrepare = this.columnMap.get(field).valuePrepareFunction;
                if (valuePrepare) {
                  value = valuePrepare.call(null, value, row);
                }
                encodedStr += '"' + value + '",'
              }
            });
            encodedStr = encodedStr.slice(0, -1);
            encodedStr += '\r\n';
          });
    
          let a = document.createElement("a");
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
    
          //Set utf-8 header to let excel recognize its encoding
          let blob = new Blob(["\ufeff", encodedStr], {type: 'text/csv'});
          a.href = window.URL.createObjectURL(blob);
          a.download = ('Listado' || '下载文件') + '.csv';
          a.click();
        });
      }


      prepareColumnMap(): void {
        
            for (const key in this.settings.columns) {
        
              if (!this.settings.columns.hasOwnProperty(key)) {
                continue;
              }
        
              const title: string = this.settings.columns[key]['title'];
              let column: TableColumn = new TableColumn();
              column.type = this.settings.columns[key]['type'];
              column.title = this.settings.columns[key]['title'];
              column.field = key;
              column.isDisplay = this.settings.columns[key]['isDisplay'];
              column.isExport = this.settings.columns[key]['isExport'];
              column.valuePrepareFunction = this.settings.columns[key]['valuePrepareFunction'];
              this.columnMap.set(column.field, column);
        
              if (this.settings.columns[key].isDisplay == false) {
                delete this.settings.columns[key];
              }
            }
          }
    }
 
    

  

