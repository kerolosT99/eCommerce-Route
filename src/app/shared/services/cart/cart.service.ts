import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Environment } from '../../../base/Environment';
import { BehaviorSubject, Observable, } from 'rxjs';
import { CartRes } from '../../interfaces/cart';
import { UserCart } from '../../interfaces/user-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumberCounter: BehaviorSubject<number> = new BehaviorSubject(0)
  userTokenHeader: any

  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) platformID: Object) {
    if (isPlatformBrowser(platformID)) {
      this.userTokenHeader = {
        token: localStorage.getItem('userToken')!
      }
    }
  }

  addProductToCart(productID: string): Observable<CartRes> {
    return this._HttpClient.post<CartRes>(`${Environment.baseURL}/api/v1/cart`, { productId: productID }, {
      headers: this.userTokenHeader
    })
  }
  getUserCart(): Observable<UserCart> {
    return this._HttpClient.get<UserCart>(`${Environment.baseURL}/api/v1/cart`, {
      headers: this.userTokenHeader
    })
  }
  updateProductQuantity(productID: string, count: string): Observable<UserCart> {
    return this._HttpClient.put<UserCart>(`${Environment.baseURL}/api/v1/cart/${productID}`, { count: count }, {
      headers: this.userTokenHeader
    })
  }
  removeSpecificItem(productID: string): Observable<UserCart> {
    return this._HttpClient.delete<UserCart>(`${Environment.baseURL}/api/v1/cart/${productID}`, {
      headers: this.userTokenHeader
    })
  }

}
