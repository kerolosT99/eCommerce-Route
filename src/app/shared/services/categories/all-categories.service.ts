import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { CategoryRes } from '../../interfaces/category';
@Injectable({
  providedIn: 'root'
})
export class AllCategoriesService {

  constructor(private _HTTPClient: HttpClient) { }
  getAllCategories(): Observable<CategoryRes> {
    return this._HTTPClient.get<CategoryRes>(`${Environment.baseURL}/api/v1/categories`)
  }
}
