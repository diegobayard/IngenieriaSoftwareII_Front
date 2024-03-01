import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {


  indice:number;
  Imagedata:ImagenData[]=[{item:"./assets/imagenes/barberia2.jpeg"},{item:"./assets/logitobarber.png"},{item:"./assets/logitobarber.png"}];
  constructor() { }

  ngOnInit(): void {
    this.indice=0;
    this.Repeat();
  }

  Repeat() {
    setTimeout(() => {
      this.funcionSlider();
      this.Repeat();
    }, 3000);
  }

  funcionSlider(){
    var i:number;
    var j = document.getElementsByClassName("miSlide") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < j.length; i++) {
      j[i].style.display = "none";
    }
    this.indice++;
    if (this.indice > j.length) {this.indice = 1}
    j[((this.indice)-1)].style.display = "block";
    //setTimeout(this.funcionSlider, 3000); //Cambia cada 3 segundos
  }

}
class ImagenData{
    item:string;

    constructor(i:string){
      this.item= i;
    }
  }
