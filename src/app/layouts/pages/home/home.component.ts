import { Component, OnInit } from '@angular/core';
import { AllProductsService } from '../../../shared/services/products/all-products.service';
import { Product } from '../../../shared/interfaces/product';
import { AllCategoriesService } from '../../../shared/services/categories/all-categories.service';
import { CategorySliderComponent } from '../../../layouts/additions/category-slider/category-slider.component';
import { HomeSliderComponent } from "../../../layouts/additions/home-slider/home-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorySliderComponent, HomeSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false
  productsList!: Product[]
  constructor(private _AllProductsService: AllProductsService, private _AllCategoriesService: AllCategoriesService) { }

  ngOnInit(): void {
    if (localStorage != null) {
      localStorage.setItem('currentPage', '/home')
    }
    this.getAllProducts()
  }
  getAllProducts() {
    this.isLoading = true
    this._AllProductsService.getAllProducts().subscribe({
      next: res => {
        this.isLoading = false
        this.productsList = res.data
        console.log(this.productsList);

      },
      error: err => {
        this.isLoading = false
        console.log(err);

      }
    })
  }

}
