import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Turno } from '../model/turno';
import { TurnoService } from '../turno.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfGeneratorService } from '../pdf-generator.service';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  currentUser: any;
  valido = false;
  hayTurno = false;
  hayTurnoAux = false;
  form:FormGroup;
  botonApretado = false;
  nombreUsuario:'';
  emailUsuario:'';
  turnos:Turno[];
  fechaActual: Date = new Date();
  diaActual: number = this.fechaActual.getDate();
  mesActual: number = this.fechaActual.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11 en JavaScript
  diaFiltro: number = this.diaActual;
  mesFiltro: number = this.mesActual;
  barberoFiltro: string = 'Sin preferencia';
  turnoActual:Turno;
  variableUsername: string = '';
  variableEmail: string = '';
  variableDia: number = 0;
  variableMes: number = 0;
  variableHora: string = '';
  variableBarbero: string = '';

  constructor(private token: TokenStorageService, private service:TurnoService, private fb:FormBuilder, private pdfGeneratorService: PdfGeneratorService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    if(this.currentUser != null){
      this.nombreUsuario = this.currentUser.username;
      this.emailUsuario = this.currentUser.email;
    }
    this.service.getAll().subscribe((turnos:Turno[])=>{
      this.turnos=turnos;
    })
    this.form=this.fb.group({
      username:this.nombreUsuario,
      email: this.emailUsuario,
      barbero:['', Validators.required],
      dia:[''],
      mes:[''],
    })
    this.botonApretado = false;
  }

  enviar(turno:Turno){
    this.botonApretado=true;
    if (!this.form.value.dia) {
      this.form.patchValue({ dia: this.diaActual });
      turno.dia = this.diaActual;
    }
    if (!this.form.value.mes) {
      this.form.patchValue({ mes: this.mesActual });
      turno.mes = this.mesActual;
    }
    this.valido=this.validar(turno);
    if(this.valido){
    //  this.service.save(turno).subscribe(()=>{
    //    console.log("Enviando los datos");
    //  })
    //this.sinTurno = (turno.mes < this.fechaActual.getMonth()+1 || (turno == null) || (turno.mes == this.fechaActual.getMonth()+1 && turno.dia < this.fechaActual.getDate()));
    //this.hayTurno = this.hayTurnoAux;
    this.hayTurno = this.asignaHayTurno(turno);
    console.log(turno.barbero + '_funcion_enviar');
    this.diaFiltro = turno.dia;
    this.mesFiltro = turno.mes;
    this.barberoFiltro = turno.barbero;
    
    /** Limpiar inpt de fechas */
    const inputDia = document.getElementById('inputDia') as HTMLInputElement;
    if (inputDia) {
      inputDia.value = '';
    }

    // Limpiar el campo de entrada de mes
    this.form.get('mes')?.setValue(null);
    }
  }
  
  abrirModal(turno:Turno){
    this.turnoActual=turno;
  }

  asignaHayTurno(turn:Turno):boolean{
    for (let t of this.turnos){
      if(t.dia == turn.dia && t.mes == turn.mes && t.disponible){
        if(t.barbero == turn.barbero || turn.barbero == 'Sin preferencia'){
          return true;
        }
      }
    }
    return false;
  }

  confirmaTurno(){
    /* Probando asignar asi para no tener tipo undefined */
    this.variableUsername = this.turnoActual.username;
    this.variableEmail = this.turnoActual.email;
    this.variableDia = this.turnoActual.dia;
    this.variableMes= this.turnoActual.mes;
    this.variableHora = this.turnoActual.hora;
    this.variableBarbero = this.turnoActual.barbero;
    /* Cierre de prueba */
    this.turnoActual.disponible = false;
    this.turnoActual.username = this.currentUser.username;
    this.turnoActual.email = this.currentUser.email;
    console.log(this.turnoActual.id);
    this.service.save(this.turnoActual).subscribe(()=>{
      console.log("Enviando los datos");
    })
    this.generarPDF(this.turnoActual);
    /*this.service.eliminarTurno(this.turnoActual).subscribe(() => {
      console.log('Turno eliminado correctamente');
    },
    error => {
      console.error('Error al eliminar el turno:', error);
    }); */ 
  }

  generarPDF(turn:Turno): void {
    this.pdfGeneratorService.generatePdf(turn);
  }

  generarPDF2(): void {
    this.pdfGeneratorService.generatePdf2(this.turnoActual);
  }


  turnoDisponible(disp:boolean, d:number, m:number, b:string):boolean{
    if (this.barberoFiltro=='Miguel' || this.barberoFiltro=='Ignacio' || this.barberoFiltro=='Alfredo'){
      if(disp==true && this.diaFiltro==d && this.mesFiltro==m && this.barberoFiltro==b){
        this.hayTurno = true;
        return true;
      }
      else{
        return false;
      }  
    }
    else{
      if(disp==true && this.diaFiltro==d && this.mesFiltro==m){
        this.hayTurno=true;
        return true;
      }
      else{
        return false;
      }
    }
  }
/*
  turnoDisponible(disp:boolean, d:number, m:number, b:string):boolean{
    if (this.barberoFiltro=='Miguel' || this.barberoFiltro=='Ignacio' || this.barberoFiltro=='Alfredo'){
      if(disp==true && this.diaFiltro==d && this.mesFiltro==m && this.barberoFiltro==b){
        return true;
      }
      else{
        return false;
      }  
    }
    else{
      if(disp==true && this.diaFiltro==d && this.mesFiltro==m){
        return true;
      }
      else{
        return false;
      }
    }
  }
*/

filtro: string = ''; // Inicializa el filtro de texto
  
  filtroTabla(value: string): void {
    this.filtro = value; // Almacena el valor del filtro de texto ingresado por el usuario
  }  

validar(turno:Turno):boolean{
    if(turno.mes == 4 || turno.mes == 6 || turno.mes == 9 || turno.mes == 11){
      if(turno.dia > 30 || turno.dia < 1){
        return false;
      }
      else{
        return true;
      }
    }
    else{
      if(turno.mes == 2){
        if(turno.dia > 29 || turno.dia < 1){
          return false;
        }
        else{
          return true;
        }
      }
      else{
        if(turno.dia < 1 || turno.dia > 31){
          return false;
        }
        else{
          return true;
        }
      }
    }
  }

}
