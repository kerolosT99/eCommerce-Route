import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { Brand, BrandsRes } from '../../interfaces/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient: HttpClient) { }

  getAllBrands(): Observable<BrandsRes> {
    return this._HttpClient.get<BrandsRes>(`${Environment.baseURL}/api/v1/brands`)
  }
  getSpecificBrand(brandID: string): Observable<Brand> {
    return this._HttpClient.get<Brand>(`${Environment.baseURL}/api/v1/brands/${brandID}`)
  }
}
