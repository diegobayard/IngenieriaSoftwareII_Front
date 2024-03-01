import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.abrirTabla(null,'Combos');
  }

      abrirTabla(evt:any, servNombres:string) {
      var i:number;
      var tablinks:any;
      var tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks") as HTMLCollectionOf<HTMLElement>;
      for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(servNombres).style.display = "block";
      evt.currentTarget.className += " active";
      }

}
