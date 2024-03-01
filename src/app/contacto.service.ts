import { Injectable } from '@angular/core';
import { Contacto } from './model/contacto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  url = 'http://localhost:8080/contactos';
  constructor(private http: HttpClient) { }

  save(contacto:Contacto): Observable<Contacto>{
    return this.http.post<Contacto>(this.url, contacto);
  }
}
