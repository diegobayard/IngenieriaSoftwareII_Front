import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from './model/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:8080/productos';
  constructor(private http: HttpClient) { }

  save(producto:Producto): Observable<Producto>{
    return this.http.post<Producto>(this.url, producto);
  }

  borrar(producto:Producto): Observable<Producto>{
    return this.http.delete<Producto>(this.url);
  } //revisar
}
