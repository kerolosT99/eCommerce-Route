import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { ProductRes } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class AllProductsService {

  constructor(private _HttpClient: HttpClient) { }

  getAllProducts(): Observable<ProductRes> {
    return this._HttpClient.get<ProductRes>(`${Environment.baseURL}/api/v1/products`)
  }
}
