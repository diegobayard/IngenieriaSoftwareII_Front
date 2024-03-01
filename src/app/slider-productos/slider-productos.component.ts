import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-productos',
  templateUrl: './slider-productos.component.html',
  styleUrls: ['./slider-productos.component.css']
})
export class SliderProductosComponent implements OnInit {

  indice:number;
  constructor() { }

  ngOnInit(): void {
    this.indice=0;
    this.Repeat();
  }

  Repeat() {
    setTimeout(() => {
      this.funcionSlider("miSlide_p");
      this.funcionSlider("miSlide_p2");
      this.funcionSlider("miSlide_p3");
      this.Repeat();
    }, 3000);
  }

  funcionSlider(clase:string){
    var i:number;
    var j = document.getElementsByClassName(clase) as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < j.length; i++) {
      j[i].style.display = "none";
    }
    this.indice++;
    if (this.indice > j.length) {this.indice = 1}
    j[((this.indice)-1)].style.display = "block";
  }

}
