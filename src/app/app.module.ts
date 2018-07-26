import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './componentes/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { RuteandoModule } from './ruteando/ruteando.module';




import { RegistroComponent } from './componentes/registro/registro.component';
import { MenuCardComponent } from './componentes/menu-card/menu-card.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { IngresoComponent } from './componentes/ingreso/ingreso.component';
import { MiHttpService } from './servicios/servicios/mi-http.service'; //servicio general para listado, busqueda/login y turnos

//Servicios para login
import { LoginService } from './servicios/servicios/login.service';
import { ServiciosService } from './servicios/servicios/servicios.service';
import { MascotaService } from './servicios/servicios/mascota.service';
import { ViajeService } from './servicios/servicios/viaje.service';
import { AutService } from './servicios/servicios/aut.service';
import { VerificarJwtService } from './servicios/servicios/verificar-jwt.service';
import { JwtModule } from './../modulos/jwt/jwt.module';
import {  ReactiveFormsModule } from '@angular/forms';


import { MascotaComponent } from './componentes/mascota/mascota.component';
import { TurnoComponent } from './componentes/turno/turno.component';
import { VerTurnosComponent } from './componentes/ver-turnos/ver-turnos.component';
import { EdadPipe } from './pipes/edad.pipe';
import { SmartTableComponent } from './componentes/smart-table/smart-table.component';

import { AltaServicioComponent } from './componentes/alta-servicio/alta-servicio.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { AltaVIajeComponent } from './componentes/alta-viaje/alta-viaje.component';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { RutaComponent } from './componentes/ruta/ruta.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { DirectionsMapDirective } from './directivas/googlr-map.directive';
import { AsignarComponent } from './componentes/asignar/asignar.component';
import { AltaComponent } from './componentes/alta/alta.component';
import { AltaVehiculoComponent } from './componentes/alta-vehiculo/alta-vehiculo.component';
import { ListadoViajesComponent } from './componentes/listado-viajes/listado-viajes.component';
import { ViajesAsignadosComponent } from './componentes/viajes-asignados/viajes-asignados.component';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings} from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { CargarEncuestaComponent } from './componentes/cargar-encuesta/cargar-encuesta.component';
//import {FileUploadModule} from 'ng2-file-upload';
import { FileDropModule } from 'ngx-file-drop';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { InformesComponent } from './componentes/informes/informes.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SinAsignarPipe } from './pipes/sin-asignar.pipe';
import { ListadousuariosComponent } from './componentes/listadousuarios/listadousuarios.component';
import { HabilitadoPipe } from './pipes/habilitado.pipe';
import { VerencuestasComponent } from './componentes/verencuestas/verencuestas.component';
import { EncuestaPipe } from './pipes/encuesta.pipe';
import { ResaltarDirective } from './directivas/resaltar.directive';


@NgModule({
  declarations: [
    AppComponent,
    
    ErrorComponent,
    PrincipalComponent,
    LoginComponent,
    MenuComponent,
  
   
  
    RegistroComponent,
    MenuCardComponent,
    CabeceraComponent,
    DirectionsMapDirective,
   
    IngresoComponent,
     MascotaComponent, TurnoComponent, VerTurnosComponent, EdadPipe, SmartTableComponent, 
      AltaServicioComponent, ListadoComponent, AltaVIajeComponent, 
      RutaComponent, UsuariosComponent, AsignarComponent, AltaComponent, AltaVehiculoComponent, ListadoViajesComponent, ViajesAsignadosComponent, CargarEncuestaComponent, InformesComponent, SinAsignarPipe, ListadousuariosComponent, HabilitadoPipe, VerencuestasComponent, EncuestaPipe, ResaltarDirective, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SmartTableModule,
    RecaptchaFormsModule,
    FileUploadModule,
    FileDropModule,
    NgxChartsModule,
    
    ChartsModule,
    RecaptchaModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDQ1jO7Is1k1hUlXifr_yzcVgTPYC7OitQ',
      libraries: ["places",'geometry']
    }),
    AgmDirectionModule,
 
   // CalendarModule,
    RuteandoModule,HttpModule, JwtModule,ReactiveFormsModule,
 

    // NgbModule.forRoot(MiRuteo),
    // importo el ruteo
    // RouterModule.forRoot(MiRuteo)
  ],
  providers: [ 
    MiHttpService,
    LoginService,
    AutService,MascotaService,VerificarJwtService,ServiciosService,ViajeService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey: '6LeA8WMUAAAAADuSJRNWeu8QJ8qYxS6TPRbLK0a8'} as RecaptchaSettings, 
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
