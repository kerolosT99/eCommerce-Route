import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { WishListRes } from '../../interfaces/wishlist';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  userTokenHeader: any
  constructor(private _HTTPClient: HttpClient, private _AuthenticationService: AuthenticationService, @Inject(PLATFORM_ID) platformID: object) {
    if (isPlatformBrowser(platformID)) {
      this.userTokenHeader = {
        token: localStorage.getItem('userToken')!
      }
    }

  }

  getUserWishList(): Observable<WishListRes> {

    return this._HTTPClient.get<WishListRes>(`${Environment.baseURL}/api/v1/wishlist`, {
      headers: this.userTokenHeader
    })
  }

  removeItemFromWishList(itemID: string): Observable<WishListRes> {
    return this._HTTPClient.delete<WishListRes>(`${Environment.baseURL}/api/v1/wishlist/${itemID}`, {
      headers: this.userTokenHeader
    })
  }

  addItemToWishList(productID: string):Observable<WishListRes> {
    return this._HTTPClient.post<WishListRes>(`${Environment.baseURL}/api/v1/wishlist`, { productId: productID }, {
      headers: this.userTokenHeader
    })
  }
}
