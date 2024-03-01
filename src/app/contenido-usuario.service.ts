import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contacto } from './model/contacto';
import { Turno } from './model/turno';
import { Producto } from './model/producto';

@Injectable({
  providedIn: 'root'
})
export class ContenidoUsuarioService {

  url = 'http://localhost:8080/api/test/';
  url2 = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(this.url + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.url + 'user', { responseType: 'text' });
  }

  getAll(): Observable<Turno[]>{
    return this.http.get<Turno[]>(this.url2 + 'turnos');
  }

  getMensajes(): Observable<Contacto[]>{
    return this.http.get<Contacto[]>(this.url2 + 'contactos');
  }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url2 + 'productos');
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.url + 'admin', { responseType: 'text' });
  }

}
