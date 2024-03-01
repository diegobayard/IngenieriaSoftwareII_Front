/*
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonaService } from '../persona.service';
import { Usuario } from '../model/usuario';
import { Persona } from '../model/persona';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  personaLog:Persona;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private service:PersonaService, private tokenStorage: TokenStorageService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      username:['', [Validators.required]],
      password:['', Validators.required]
    })
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  consultar(usuario:Usuario){
    this.service.login(usuario).subscribe(data => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.reloadPage();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  );

}

reloadPage() {
  window.location.reload();
}

}
*/

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
