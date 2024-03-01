import { Component, OnInit } from '@angular/core';
import { ContenidoUsuarioService } from '../contenido-usuario.service';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listarProductos: boolean = false;
  productos:Producto[];

  constructor(private userService: ContenidoUsuarioService) { }

  ngOnInit(): void {
    //this.abrirTabla(null,'Primont');
    this.userService.getProductos().subscribe((productos:Producto[])=>{
      this.productos=productos;
    })
  }

  abrirTabla(evt:any, servNombres:string) {
    var i:number;
    var tablinks:any;
    var tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(servNombres).style.display = "block";
    evt.currentTarget.className += " active";
  }

  listaProductos(){
    this.listarProductos = !this.listarProductos;
  }

  ocultarProducto(disp:boolean):boolean{
    return (disp && this.listarProductos);
  }

  filtro: string = ''; // Inicializa el filtro de texto
  productosDisponibles: boolean = true;

  filtroTabla(value: string): void {
    this.filtro = value; // Almacena el valor del filtro de texto ingresado por el usuario
    // Verifica si hay productos que coinciden con el filtro
  this.productosDisponibles = this.productos.some(p => 
    this.ocultarProducto(p.disponible) && p.nombre.toLowerCase().includes(this.filtro.toLowerCase())
  );
  }

}
