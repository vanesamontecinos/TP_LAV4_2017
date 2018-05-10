export class Persona {
    usuario:string;
    contraseña:string;
   

    constructor(){}

    public  guardar(){
        console.info(this);
        localStorage.setItem('datos', JSON.stringify(this));
    }
    public Traer(){
   var dato=JSON.parse(localStorage.getItem('datos'));
   this.usuario=dato.usuario;
   
   this.contraseña=dato.contraseña;
 
}
}