import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ContenidoUsuarioService } from '../contenido-usuario.service';
import { Contacto } from '../model/contacto';
import { Turno } from '../model/turno';
import { TokenStorageService } from '../token-storage.service';
import { Producto } from '../model/producto';
import { TurnoService } from '../turno.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = '';
  turnos:Turno[];
  contactos:Contacto[];
  productos:Producto[];
  currentUser:any;
  private privilegios:String[];
  esAdmin = false;
  esEmpleado = false;
  turnoActual:Turno;
  productoActual:Producto;
  productoNuevo:Producto;
  form: FormGroup;
  productoAgregado: boolean = false;
  listarProductos: boolean = false;
  precioCoste: boolean = false;
  nombreAlerta:boolean = false;
  descAlerta:boolean = false;
  precioAlerta:boolean = false;
  costeAlerta:boolean = false;
  cantAlerta:boolean = false;
  provAlerta:boolean = false;
  precioCosteEdit:boolean = false;
  precioInv:boolean = false;
  costeInv:boolean = false;
  cantInv:boolean = false;
  confirmaEditaProd:boolean = false;
  nombreProductoInput;
  descripcionInput;
  precioInput;
  costeInput;
  cantidadInput;
  proveedorInput;

  constructor(private userService: ContenidoUsuarioService, private token: TokenStorageService, private fb:FormBuilder, private service:TurnoService, private prodService:ProductoService, private router: Router) { }

  ngOnInit() {
    /*
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );*/
    this.currentUser = this.token.getUser();
    if(this.currentUser!=null){
      this.privilegios=this.currentUser.roles;
      this.esAdmin = (this.privilegios.includes('ROLE_ADMIN') || this.privilegios.includes('ROLE_EMPLEADO'));
      this.esEmpleado = this.privilegios.includes('ROLE_EMPLEADO');
    }

    this.userService.getAll().subscribe((turnos:Turno[])=>{
      this.turnos=turnos;
    })

    this.userService.getMensajes().subscribe((contactos:Contacto[])=>{
      this.contactos=contactos;
    })

    this.userService.getProductos().subscribe((productos:Producto[])=>{
      this.productos=productos;
    })

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, this.precioValido]],
      disponible: true,
      coste: ['', [Validators.required, this.costeValido]],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      proveedor: ['', Validators.required]
    });
  }

  precioValido(control: AbstractControl): { [key: string]: any } | null {
    const precio = control.value;
    if (precio !== null && precio < 0) {
      return { 'precioInvalido': true };
    }
    return null;
  }
  
  costeValido(control: AbstractControl): { [key: string]: any } | null {
    const coste = control.value;
    //const precio = this.form.get('precio').value;
    if (coste !== null && coste < 0) {
      return { 'costeInvalido': true };
    }
    return null;
  }

  comparaPrecioCoste(){
    this.precioCoste = false;
    const precio = this.form.get('precio').value;
    const coste = this.form.get('coste').value;
    
    // Aquí puedes trabajar con los valores de precio y coste
    console.log('Precio:', precio);
    console.log('Coste:', coste);

    this.precioCoste = precio >= coste;
  }

  salir(){
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  agregarProducto(datosFormulario: Producto){
    console.log("Hola");
    this.prodService.save(datosFormulario).subscribe(()=>{
      console.log("Enviando los datos");
    })
    const modalElement = document.getElementById('exampleModal5');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.setAttribute('style', 'display: none');
    }
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop);
    }
    // Marcar el producto como agregado exitosamente
    this.productoAgregado = true;
    // Restablecer productoAgregado después de 3 segundos para ocultar la notificación
    setTimeout(() => {
      this.productoAgregado = false;
    }, 2000);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  listaProductos(){
    this.listarProductos = !this.listarProductos;
  }

  borrarProducto(){
    this.productoActual.disponible = false;
    this.prodService.save(this.productoActual).subscribe(()=>{
      console.log("Enviando los datos");
    })
  }

  validarEditarProducto(producto: string, desc: string, precio: number, coste: number, cantidad: number, proveedor: string){
      //const nombreProductoInput = document.getElementById('nombreProducto') as HTMLInputElement;
      //const descripcionInput = document.getElementById('descripcion') as HTMLInputElement;
      //const precioInput = document.getElementById('precio') as HTMLInputElement;
      //const costeInput = document.getElementById('coste') as HTMLInputElement;
      //const cantidadInput = document.getElementById('cantidad') as HTMLInputElement;
      //const proveedorInput = document.getElementById('proveedor') as HTMLInputElement;
      const nombreProductoInput = producto;
      const descripcionInput = desc;
      const precioInput = precio;
      const costeInput = coste;
      const cantidadInput = cantidad;
      const proveedorInput = proveedor;
      //
      this.nombreAlerta = false;
      this.descAlerta = false;
      this.precioAlerta = false;
      this.costeAlerta = false;
      this.cantAlerta = false;
      this.provAlerta = false;
      this.precioCosteEdit = false;
      this.precioInv = false;
      this.costeInv = false;
      this.cantInv = false;

      console.log("COSTE: "+costeInput+" PRECIO: "+precioInput);
  
      // Verificando si los elementos son null
      if (!nombreProductoInput || !descripcionInput || !precioInput || !costeInput || !cantidadInput || !proveedorInput) {
          console.error('Error: Al menos uno de los elementos no fue encontrado.');
          if(!nombreProductoInput){
            this.nombreAlerta = true;
          }
          if (!descripcionInput){
            this.descAlerta= true;
          }
          if(!precioInput){
            this.precioAlerta = true;
          }
          if(!costeInput){
            this.costeAlerta=true;
          }
          if(!cantidadInput){
            this.cantAlerta=true;
          }
          if(!proveedorInput){
            this.provAlerta = true;
          }
      }
      else{ 
        if (precio < coste){
          this.precioCosteEdit = true;
        }
        if(precio < 0){
          this.precioInv = true;
        }
        if(coste < 0){
          this.costeInv = true;
        }
        if(cantidad < 0){
          this.cantInv = true;
        }
        if(precio>=coste && coste >= 0 && cantidad >= 0){
        this.guardaProducto(producto, desc, precio, coste, cantidad, proveedor);
     }
    }
  }

  guardaProducto(producto: string, desc: string, precio: number, coste: number, cantidad: number, proveedor: string){
    this.nombreProductoInput = producto;
    this.descripcionInput = desc;
    this.precioInput = precio;
    this.costeInput = coste;
    this.cantidadInput = cantidad;
    this.proveedorInput = proveedor;
  }

  editarProducto2(){
    this.productoActual.nombre = this.nombreProductoInput;
    this.productoActual.descripcion = this.descripcionInput;
    this.productoActual.precio = this.precioInput;
    this.productoActual.coste = this.costeInput;
    this.productoActual.cantidad = this.cantidadInput;
    this.productoActual.proveedor = this.proveedorInput;
    this.prodService.save(this.productoActual).subscribe(()=>{
      console.log("Enviando los datos");
    })
  }
  
  editarProducto(producto: string, desc: string, precio: number, coste: number, cantidad: number, proveedor: string){
    this.productoActual.nombre = producto;
    this.productoActual.descripcion = desc;
    this.productoActual.precio = precio;
    this.productoActual.coste = coste;
    this.productoActual.cantidad = cantidad;
    this.productoActual.proveedor = proveedor;
    this.prodService.save(this.productoActual).subscribe(()=>{
      console.log("Enviando los datos");
    })
  }

  borrarTurno(){
    this.turnoActual.disponible = true;
    this.service.save(this.turnoActual).subscribe(()=>{
      console.log("Enviando los datos");
    })
  }

  editarTurno(user:string,mail:string,disp:boolean){
    this.turnoActual.username = user;
    this.turnoActual.email = mail;
    this.turnoActual.disponible = disp;
    this.service.save(this.turnoActual).subscribe(()=>{
      console.log("Enviando los datos");
    })
  }
  
  abrirModal(turno:Turno){
    this.turnoActual=turno;
  }

  abrirModalProducto(producto:Producto){
    this.productoActual = producto;
  }

  ocultarParrafo(disp:boolean):boolean{
    return disp;
  }

  ocultarProducto(disp:boolean):boolean{
    return (disp && this.listarProductos);
  }

  limpiarInput(){
    this.form.reset();
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

}
