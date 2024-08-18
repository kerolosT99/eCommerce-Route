import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage != null) {
      localStorage.setItem('currentPage', '/brands')
    }
  }
}
