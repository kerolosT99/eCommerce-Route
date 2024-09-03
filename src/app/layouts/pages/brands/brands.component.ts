import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { Brand } from '../../../shared/interfaces/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  isLoading: boolean = false
  brandsList!: Brand[]
  specificBrand!: Brand
  constructor(private _BrandsService: BrandsService) { }
  ngOnInit(): void {
    if (localStorage != null) {
      localStorage.setItem('currentPage', '/brands')
    }
    this.getAllBrands()
  }
  getAllBrands() {
    this.isLoading = true
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.isLoading = false
        this.brandsList = res.data
        console.log(this.brandsList);
      }
    })
  }
  getSpecificBrand(brandID: string) {
    this.isLoading = true
    this._BrandsService.getSpecificBrand(brandID).subscribe({
      next: (res) => {
        this.isLoading = false
        this.specificBrand = res
      }
    })
  }
  
}
