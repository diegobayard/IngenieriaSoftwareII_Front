import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Turno } from './model/turno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  url = 'http://localhost:8080/turnos';
  constructor(private http: HttpClient) { }

  save(turno:Turno): Observable<Turno>{
    return this.http.post<Turno>(this.url, turno);
  }

  getAll(): Observable<Turno[]>{
    return this.http.get<Turno[]>(this.url);
  }

  eliminarTurno(turno: Turno): Observable<Turno> {
    return this.http.delete<Turno>(this.url);
  }

}
