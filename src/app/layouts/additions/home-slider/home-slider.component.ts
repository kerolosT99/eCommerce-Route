import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.scss'
})
export class HomeSliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
}
