import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CartData } from '../../../shared/interfaces/user-cart';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  isLoading:boolean=false
  errorMsg!: string
  cartData!: CartData
  constructor(private _CartService: CartService, private _ToastrService:ToastrService) { }
  ngOnInit(): void {
    if (localStorage != null) {
      localStorage.setItem('currentPage', '/cart')
    }
    this.getUserCart()
  }
  getUserCart() {
    this.isLoading=true
    this._CartService.getUserCart().subscribe({
      next: res => {
        this.isLoading=false
        this.cartData = res.data
        console.log(res.data);
      },
      error: err => {
        this.errorMsg = err.error.message
      }
    })
  }
  removeSpecificProduct(productID: string) {
    this._CartService.removeSpecificItem(productID).subscribe({
      next: res => {
        this._ToastrService.error("Item removed from the cart", '', {
          progressBar: true
        })
        this._CartService.getUserCart().subscribe({
          next: res => {
            this._CartService.cartNumberCounter.next(res.numOfCartItems)
            console.log(this._CartService.cartNumberCounter.getValue());

          }
        })

        console.log(res);
        this.cartData = res.data
      },
      error: err => {
        console.log(err);
      }

    })
  }
  updateProductQuantity(productID: string, count: number) {
    if (count <= 0) {
      this.removeSpecificProduct(productID)
    }
    else {
      this._CartService.updateProductQuantity(productID, count.toString()).subscribe({
        next: res => {
          console.log(res);
          this.cartData = res.data
        }
      })
    }
  }

}
