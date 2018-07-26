import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/servicios/login.service';
import { ViajeService } from '../../servicios/servicios/viaje.service';
@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  countPreg7Tal=0;
  countPreg7No=0;
  countPreg7=0;
  preg7tres: number;
  preg7uno: number;
  preg7dos: number;
  countPreg1Tal=0;
  countPreg1=0;
  countPreg1No=0;
  totalPreg1Talvez: number;
  totalPreg1No: number;
  totalPreg1Si: number;
  listSi: any;
  countNo=0;
  totalPreg4No: any;
  totalPreg4Si: any;
  total: any;
  count=0;
    //  Doughnut chart
  // -----------------------------------
 /* doughnutData = {
      labels: [
          'SI',
          'NO',
          'TAL VEZ'
      ],
      datasets: [{
          data: [this.totalPreg1("SI"), this.totalPreg1("NO"), this.totalPreg1("TAL VEZ")]
      }]
  };
*/
 /* doughnutColors = [{
      borderColor: [
          this.colors.byName('purple'),
          this.colors.byName('pink'),
          this.colors.byName('yellow')
      ],
      backgroundColor: [
          this.colors.byName('purple'),
          this.colors.byName('pink'),
          this.colors.byName('yellow')
      ],
  }];*/

  doughnutOptions = {
      responsive: true
  };
  // Bar 0chart
  // -----------------------------------
  barData = {
      labels: ['Muy Buena', 'Buena','Regular','Mala'],
      datasets: [
          {
              data: [this.preg1MB(),this.preg1B(),this.preg1R(),this.preg1M()]
             // data: [this.totalSi("SI"), this.totalSi("NO")]
          }]
  };
  public barChartType:string = 'bar';
 /* barColors = [
      {
          backgroundColor: this.colors.byName('info'),
          borderColor: this.colors.byName('info'),
          pointHoverBackgroundColor: this.colors.byName('info'),
          pointHoverBorderColor: this.colors.byName('info')
      }, {
          backgroundColor: this.colors.byName('primary'),
          borderColor: this.colors.byName('primary'),
          pointHoverBackgroundColor: this.colors.byName('primary'),
          pointHoverBorderColor: this.colors.byName('primary')
      }];*/

  bar2Options = {
      scaleShowVerticalLines: true,
      responsive: true
  };
  bar2Data = {
    labels: ['Si', 'No, muy caro','No, muy barato'],
    datasets: [
        {
            data: [this.preg4SI(),this.preg4CARO(),this.preg4BARATO()]
           // data: [this.totalSi("SI"), this.totalSi("NO")]
        }]
};

  // Pie chart
  // -----------------------------------

  public pieChartLabels:string[] = ['Clientes ', 'Remiseros', 'Encargadoss'];
  public pieChartData:any[] = [this.totalClientes(), this.totalRemiseros(), this.totalEncargados()];
  public pieChartType:string = 'pie';
  pieData = {
      labels: [
          'Clientes',
          'Remiseros',
          'Encargados'
      ],
      datasets: [{
          data: [this.totalClientes(), this.totalRemiseros(), this.totalEncargados()]
      }]
  };

 

  pieOptions = {
      responsive: true
  };


  ///
   // Pie chart 2
  // -----------------------------------
  pieData2 = {
      labels2: [
          'SI','NO','TAL VEZ'
      ],
      datasets: [{
          data: [this.preg5SI(), this.preg5NO(), this.preg5TALVEZ()]
      }]
  };

 /* pieColors2 = [{
      borderColor: [
          this.colors.byName('danger'),
          this.colors.byName('yellow'),
          this.colors.byName('purple')
      ],
      backgroundColor: [
          this.colors.byName('danger'),
          this.colors.byName('yellow'),
          this.colors.byName('purple')
      ],
  }];*/

  pieOptions2 = {
      responsive: true
  };
  private listViajes: any;
  private unarray =[];
  private unarray1 =[];   
   private cantidad1= 0;
  
  rol:string;
  encargado: boolean;
  otros:boolean;
  listo: boolean;
  constructor( private PersonaS: LoginService, private viaje:ViajeService) { 

  }

  ngOnInit() {  
      this.listo = false;
     // this.buscarRol();
      
          if(!this.listo){
              
            //  this.spinner.show();
              
              setTimeout(() => {
              
             //  this.spinner.hide(); 
               this.listo = false;
          }, 8000);
      
          }
  }

  totalClientes(){
      
    this.PersonaS.traerClientes()
    .then(datos => {
      this.totalClientes = datos.length;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  console.log('ddd'+this.totalClientes)}

    totalUsuarios(){
      
    this.PersonaS.ObtenerTodos()
    .then(datos => {
      this.total = datos.length;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });}
  totalRemiseros(){
    this.PersonaS.traerRemiseros()
    .then(datos => {
      this.totalRemiseros = datos.length;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  }

  totalEncargados(){
    this.PersonaS.traerEncargados()
    .then(datos => {
      this.totalEncargados = datos.length;
      //this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  }

  preg1MB(){
    this.viaje.traerEncuestaPreg1("MB")
    .then(datos => {
      this.preg1MB = datos.length;
      console.log(datos.length);
    });
  }
  preg1B(){
    this.viaje.traerEncuestaPreg1("B")
    .then(datos => {
      this.preg1B = datos.length;
      console.log(datos.length);
    });
  }
  preg1R(){
    this.viaje.traerEncuestaPreg1("R")
    .then(datos => {
      this.preg1R = datos.length;
      console.log(datos.length);
    });
  }
  preg1M(){
    this.viaje.traerEncuestaPreg1("M")
    .then(datos => {
      this.preg1M = datos.length;
      console.log(datos.length);
    });
  }
 
  preg4SI(){
    this.viaje.traerEncuestaPreg4("SI")
    .then(datos => {
      this.preg4SI = datos.length;
      console.log(datos.length);
    });
  }
  preg4CARO(){
    this.viaje.traerEncuestaPreg4("CARO")
    .then(datos => {
      this.preg4CARO = datos.length;
      console.log(datos.length);
    });
  }
  preg4BARATO(){
    this.viaje.traerEncuestaPreg4("BARATO")
    .then(datos => {
      this.preg4BARATO = datos.length;
      console.log('barato'+datos.length);
    });
  }
  preg5SI(){
    this.viaje.traerEncuestaPreg5("SI")
    .then(datos => {
      this.preg5SI = datos.length;
      console.log('barato'+datos.length);
    });
  }
  preg5NO(){
    this.viaje.traerEncuestaPreg5("NO")
    .then(datos => {
      this.preg5NO = datos.length;
      console.log('barato'+datos.length);
    });
  }
  preg5TALVEZ(){
    this.viaje.traerEncuestaPreg5("TALVEZ")
    .then(datos => {
      this.preg5TALVEZ = datos.length;
      console.log('barato'+datos.length);
    });
  }


 
}