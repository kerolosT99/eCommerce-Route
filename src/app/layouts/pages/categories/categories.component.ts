import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage != null) {
      localStorage.setItem('currentPage', '/categories')
    }
  }
}
