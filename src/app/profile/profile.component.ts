import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../token-storage.service';
import { TurnoService } from '../turno.service';
import { Turno } from '../model/turno';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
  }

}
