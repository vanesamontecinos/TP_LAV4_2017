import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Jugador } from '../../clases/jugador';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  JugadoresRegistrados:Array<any>;
email: string;
psw:string;
nuevoJugador:Jugador;
  constructor() { }

  ngOnInit() {
  }
  Registrarme()
  {
    this.nuevoJugador=new Jugador();
  }

}
