import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { WishItem } from '../../../shared/interfaces/wishlist';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  isLoading: boolean = false
  wishList!: WishItem[]
  constructor(private _WishlistService: WishlistService, private _ToastrService: ToastrService, private _CartService: CartService) {

  }
  ngOnInit(): void {
    if (localStorage != null) {
      localStorage.setItem('currentPage', 'wishlist')
    }
    this.getUserWishList()
  }
  getUserWishList() {
    this.isLoading = true
    this._WishlistService.getUserWishList().subscribe({
      next: (res) => {
        this.isLoading = false
        this.wishList = res.data
      }
    })
  }
  removeItemFromWishList(itemID: string) {
    this._WishlistService.removeItemFromWishList(itemID).subscribe({
      next: (res) => {
        this._WishlistService.getUserWishList().subscribe({
          next: (res) => {
            this.wishList = res.data
          }
        })
        this._ToastrService.error(`Item removed from wishlist`)
        console.log(res);

      },
      error: (err) => {
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
}

