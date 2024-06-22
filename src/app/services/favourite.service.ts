import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  favItems:BehaviorSubject<boolean>=new BehaviorSubject(false)
  constructor(private _httpClient:HttpClient) { 
   this.showFav().subscribe({
    next:(res)=>{
      this.favItems=res
    }
   })
  }
  baseUrl:string='https://ecommerce.routemisr.com'
  addToFav(id:string) :Observable<any>{
    return this._httpClient.post(`${this.baseUrl}/api/v1/wishlist`,{productId:id},
    {
 headers:{
   // token:localStorage.getItem('_token') || ''  ; token return null we can handle it in these two ways
   token : `${localStorage.getItem('_token')}` 
 }
    })
   }
   showFav():Observable<any>{
return this._httpClient.get(`${this.baseUrl}/api/v1/wishlist` ,
{  headers:{
  // token:localStorage.getItem('_token') || ''  ; token return null we can handle it in these two ways
  token : `${localStorage.getItem('_token')}`} 
})
   }
   removeItem(id:string):Observable<any>{
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, 
    {
      headers:{
        token: `${localStorage.getItem('_token')}`
      },
      
    })
  }
}
