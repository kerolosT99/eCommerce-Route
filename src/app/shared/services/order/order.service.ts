import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { shippingData } from '../../interfaces/account-data';
import { Observable } from 'rxjs';
import { OrdersRes } from '../../interfaces/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  userTokenHeader = {
    token: localStorage.getItem('userToken')!
  }
  constructor(private _HttpClient: HttpClient) { }



  getAllOrders(userID: string): Observable<OrdersRes[]> {
    return this._HttpClient.get<OrdersRes[]>(`${Environment.baseURL}/api/v1/orders/user/${userID}`)
  }

  visaCheckOut(cartID: string, data: shippingData): Observable<any> {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/orders/checkout-session/${cartID}?url=${Environment.mainWebsiteURL}`, { shippingAddress: data },
      {
        headers: this.userTokenHeader
      })
  }
  cashCheckOut(cartID: string, data: shippingData): Observable<any> {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/orders/${cartID}`, { shippingAddress: data },
      {
        headers: this.userTokenHeader
      })
  }

}
