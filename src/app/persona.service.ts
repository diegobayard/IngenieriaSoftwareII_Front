/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from './model/persona'
import { Observable } from 'rxjs'
import { Usuario } from './model/usuario';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = 'http://localhost:8080/api/auth/';
  //url2 = 'http://localhost:8080/personas/autenticacion';
  constructor(private http: HttpClient) { }

  save(user:Persona): Observable<any> {
    return this.http.post(this.url + 'signup', {
      username: user.email,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  getAll(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.url);
  }

  login(credentials:Usuario): Observable<any> {
    return this.http.post(this.url + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
}
//https://bezkoder.com/angular-spring-boot-jwt-auth/
//https://bezkoder.com/angular-jwt-authentication/
*/
