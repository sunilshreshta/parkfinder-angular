import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.scss']
})
export class ImgCarouselComponent implements OnInit {
  carouselElements = [{active: true, "imgUrl" : "../../assets/img/parking.jpg"},
                        {active: false, "imgUrl" : "../../assets/img/parking2.jpg"},
                        {active: false, "imgUrl" : "../../assets/img/parking3.jpg"}] ;
  constructor() { }

  ngOnInit(): void {
  }

}
 
