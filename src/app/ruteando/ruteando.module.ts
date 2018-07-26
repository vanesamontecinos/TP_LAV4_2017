import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { MenuComponent } from '../componentes/menu/menu.component';
import { IngresoComponent } from '../componentes/ingreso/ingreso.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { MenuCardComponent } from '../componentes/menu-card/menu-card.component';
import { CabeceraComponent } from '../componentes/cabecera/cabecera.component';
import { MascotaComponent } from '../componentes/mascota/mascota.component';
import { VerificarJwtService } from '../servicios/servicios/verificar-jwt.service';
import { TurnoComponent } from '../componentes/turno/turno.component';
import { VerTurnosComponent } from '../componentes/ver-turnos/ver-turnos.component';
import { SmartTableComponent } from '../componentes/smart-table/smart-table.component';
import { AltaServicioComponent } from '../componentes/alta-servicio/alta-servicio.component';
import { AltaComponent } from '../componentes/alta/alta.component';
import { AltaVIajeComponent } from '../componentes/alta-viaje/alta-viaje.component';
import { AltaVehiculoComponent } from '../componentes/alta-vehiculo/alta-vehiculo.component';
import { ListadoViajesComponent } from '../componentes/listado-viajes/listado-viajes.component';
import { InformesComponent } from '../componentes/informes/informes.component';
import { ListadousuariosComponent } from '../componentes/listadousuarios/listadousuarios.component';

import { CargarEncuestaComponent } from '../componentes/cargar-encuesta/cargar-encuesta.component';
import { RutaComponent } from '../componentes/ruta/ruta.component';
import { ListadoComponent } from '../componentes/listado/listado.component';
import { AsignarComponent } from '../componentes/asignar/asignar.component';
import { VerencuestasComponent } from '../componentes/verencuestas/verencuestas.component';
import { ViajesAsignadosComponent } from '../componentes/viajes-asignados/viajes-asignados.component';
// declaro donde quiero que se dirija
const MiRuteo = [
{path: '' , component: IngresoComponent},
{path: 'Login' , component: LoginComponent},
{path: 'VerTurnos' , component: VerTurnosComponent},
{path: 'Registro' , component: RegistroComponent},
{path: 'Principal' , component: PrincipalComponent},
{path: 'SmartTable' , component: SmartTableComponent},
{path: 'Ingreso' , component: IngresoComponent},
{path: 'AltaMascota' , component: MascotaComponent},
{path: 'AltaTurno' , component: TurnoComponent},

{ path: 'Principal' ,
component: PrincipalComponent ,
children:
     [{path: '' , component: MenuCardComponent},
     
     
  
      //{path: 'PPT' , component: MascotaComponent},
     // {path: 'PPT' , canActivate: [VerificarJwtService], component: MascotaComponent},
      {path: 'AltaServicio' ,canActivate: [VerificarJwtService], component: AltaServicioComponent},
      {path: 'CargarEncuesta' ,canActivate: [VerificarJwtService], component: CargarEncuestaComponent},
      
      {path: 'Alta' ,canActivate: [VerificarJwtService], component: AltaComponent},
      {path: 'AltaViaje' , canActivate: [VerificarJwtService],component: AltaVIajeComponent},
      {path: 'Ruta' , canActivate: [VerificarJwtService],component: RutaComponent},
      {path: 'Listado' , canActivate: [VerificarJwtService],component: ListadoComponent},
      {path: 'SmartTable' , canActivate: [VerificarJwtService],component: SmartTableComponent},
      {path: 'Asignar' , canActivate: [VerificarJwtService],component: AsignarComponent},
      {path: 'AltaVehiculo' , canActivate: [VerificarJwtService],component: AltaVehiculoComponent},
      {path: 'ListadoViajes' , canActivate: [VerificarJwtService],component: ListadoViajesComponent},
      {path: 'ViajesAsignados' , canActivate: [VerificarJwtService],component: ViajesAsignadosComponent},
      {path: 'Informes' , canActivate: [VerificarJwtService],component: InformesComponent},
      {path: 'Menu' , canActivate: [VerificarJwtService],component: MenuCardComponent},
      {path: 'ListadoUsuarios' , canActivate: [VerificarJwtService],component: ListadousuariosComponent},
      {path: 'Encuestas' , canActivate: [VerificarJwtService],component: VerencuestasComponent},
      
      {path: 'VerTurnos' , canActivate: [VerificarJwtService],component: VerTurnosComponent}],
      
},
{path: '**' , component: ErrorComponent},
{path: 'error' , component: ErrorComponent}];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
