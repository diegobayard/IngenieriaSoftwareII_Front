/*
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonaService } from '../persona.service';
import { Persona } from '../model/persona';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form:FormGroup;
  personas:Persona[];

  constructor(private service:PersonaService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      nombre:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })

    this.service.getAll().subscribe((personas: Persona[])=>{
      this.personas=personas;
    })
  }

  enviar(persona:Persona){
    this.service.save(persona).subscribe(()=>{
      console.log("Enviando los datos");
      this.personas.push(persona);
    })
  }

}
*/

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
