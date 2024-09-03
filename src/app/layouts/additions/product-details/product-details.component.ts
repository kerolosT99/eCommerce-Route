import { Component, OnInit } from '@angular/core';
import { AllProductsService } from '../../../shared/services/products/all-products.service';
import { Product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
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
      },
    },
    nav: true
  }
  isLoading:boolean=false
  id!: string
  product!: Product

  constructor(private _AllProductsService: AllProductsService, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService, private _ToastrService: ToastrService) {

  }
  ngOnInit(): void {
    this.getSpecificProduct()
  }
  getSpecificProduct() {
    this.isLoading=true
    this._ActivatedRoute.params.subscribe({
      next: params => {
        this.id = params['id']
      }
    })
    this._AllProductsService.getSpecificProduct(this.id).subscribe({
      next: res => {
        this.isLoading=false
        this.product = res.data
        console.log(this.product);
      }
      ,
      error: err => {
        console.log(err);

      }
    })
  }
  addProductToCart() {
    this._CartService.addProductToCart(this.id).subscribe({
      next: res => {

        this._CartService.getUserCart().subscribe({
          next: res => {
            this._CartService.cartNumberCounter.next(res.numOfCartItems)
            console.log(this._CartService.cartNumberCounter.getValue());

          }
        })

        this._ToastrService.success(res.message, '', {
          progressBar: true
        })
        console.log(res)
      },
      error: err => {
        console.log(err)
      },
    })
  }
}
