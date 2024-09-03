import { Component, OnInit } from '@angular/core';
import { AllCategoriesService } from '../../../shared/services/categories/all-categories.service';
import { Category } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  isLoading: boolean = false
  categoriesList!: Category[]
  constructor(private _AllCategoriesService: AllCategoriesService) { }
  ngOnInit(): void {
    if (localStorage != null) {
      localStorage.setItem('currentPage', '/categories')
    }
    this.getAllCategories()
  }
  getAllCategories() {
    this.isLoading = true
    this._AllCategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.isLoading = false
        console.log(res.data);
        this.categoriesList = res.data
      }
    })
  }
}
