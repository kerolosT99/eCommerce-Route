import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../additions/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { NgClass, UpperCasePipe } from '@angular/common';
import { ProductSearchPipe } from '../../../shared/pipes/product-search.pipe';
import { FormsModule } from '@angular/forms';
import { AllProductsService } from '../../../shared/services/products/all-products.service';
import { Product } from '../../../shared/interfaces/product';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { WishItem } from '../../../shared/interfaces/wishlist';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, ProductSearchPipe, FormsModule, NavbarComponent, NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  userWishList!: WishItem[]
  isLoading: boolean = false
  userWord: string = ''
  productsList!: Product[]
  constructor(private _AllProductsService: AllProductsService, private _CartService: CartService, private _ToastrService: ToastrService, private _WishlistService: WishlistService) { }
  ngOnInit(): void {
    if (localStorage != null) {
      localStorage.setItem('currentPage', '/products')
    }
    this.getAllProducts()
    this.getUserWishList()
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
  addProductToCart(productID: string) {
    this._CartService.addProductToCart(productID).subscribe({
      next:
        res => {
          console.log(res);

          this._CartService.getUserCart().subscribe({
            next: res => {
              this._CartService.cartNumberCounter.next(res.numOfCartItems)
              console.log(this._CartService.cartNumberCounter.getValue());

            }
          })

          this._ToastrService.success(res.message, '', {
            progressBar: true
          })
        },
      error: err => {
        console.log(err);
      }
    })
  }
  getUserWishList() {
    this._WishlistService.getUserWishList().subscribe({
      next: (res) => {
        this.userWishList = res.data
        console.log(this.userWishList);

      }
    })
  }
  isWished(productID: string): boolean {
    let isWished: boolean = false
    for (let i = 0; i < this.userWishList.length; i++) {
      if (this.userWishList[i]._id == productID) {
        return isWished = true
      }
    }
    return isWished

  }
  toggleWishItem(productID: string) {
    this.isLoading = true
    let isWished: boolean = true
    for (let i = 0; i < this.userWishList.length; i++) {
      if (this.userWishList[i]._id == productID) {
        isWished = false
        this._WishlistService.removeItemFromWishList(productID).subscribe({
          next: (res) => {
            this.isLoading = false
            this._WishlistService.getUserWishList().subscribe({
              next:(res)=>{
                this.userWishList = res.data
              }
            })
          },
          error: (err) => {
            this.isLoading = false
            console.log(err);

          }
        })
      }
    }
    if (isWished == true) {
      this._WishlistService.addItemToWishList(productID).subscribe({
        next: (res) => {
          this.isLoading = false
          this._WishlistService.getUserWishList().subscribe({
            next:(res)=>{
              this.userWishList = res.data
            }
          })
          console.log(this.userWishList);
          console.log(isWished);
          
        },
        error: (err) => {
          this.isLoading = false
          console.log(err);

        }
      })
    }
  }
}
