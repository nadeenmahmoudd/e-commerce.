import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  constructor(private _httpClient:HttpClient) { }
  baseUrl:string="https://ecommerce.routemisr.com"
  getAllProducts():Observable<any>{
   return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  getProductById(id:string):Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   }
   getAllCategories():Observable<any>{
   return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
   }
   
}
