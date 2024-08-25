import { Component, OnInit } from '@angular/core';
import { AllCategoriesService } from '../../../shared/services/categories/all-categories.service';
import { Category } from '../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {
  isLoading: boolean = false
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
        items: 7
      }
    },
    nav: true
  }
  categoryList!: Category[]
  constructor(private _AllCategoriesService: AllCategoriesService) { }
  ngOnInit(): void {
    this.getAllCategorties()
  }
  getAllCategorties() {
    this.isLoading=true
    this._AllCategoriesService.getAllCategories().subscribe({
      next: res => {
        this.isLoading=false
        this.categoryList = res.data
        console.log(this.categoryList);

      },
      error: err => {
        this.isLoading=false
        console.log(err);

      }
    })
  }
}
