import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css']
})
export class RedesComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  clickeado: boolean = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_EMPLEADO'));

      this.username = user.username;
    }
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  clickear(){
    this.clickeado = !this.clickeado;
  }
}
