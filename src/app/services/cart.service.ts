import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartItems:BehaviorSubject<number>=new BehaviorSubject(0)
  constructor(private _httpClient:HttpClient) {
    this.getCart().subscribe({
      next:(res)=>{
        this.cartItems.next(res.numOfCartItems)
      }
    })
   }
  baseUrl:string="https://ecommerce.routemisr.com";

  addToCart(id:string) :Observable<any>{
   return this._httpClient.post(`${this.baseUrl}/api/v1/cart`,{productId:id},
   {
headers:{
  // token:localStorage.getItem('_token') || ''  ; token return null we can handle it in these two ways
  token : `${localStorage.getItem('_token')}` 
}
   })
  }
  getCart():Observable<any>{
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token: `${localStorage.getItem('_token')}`
      }
    })
  }
  updateCartProductQuantity(id:string , count:number):Observable<any>{
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      count: `${count}`
    },{
      headers:{
        token: `${localStorage.getItem('_token')}`
      },
      
    })
  }
  removeItem(id:string):Observable<any>{
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers:{
        token: `${localStorage.getItem('_token')}`
      },
      
    })
  }
  checkOut(id:string , shippingData:object):Observable<any>{
    let encodedUrl=`http://localhost:4200`+encodeURIComponent('#');
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${encodedUrl}` ,{
      shippingAddress:shippingData
    },
    {
      headers:{
        token :`${localStorage.getItem('_token')}`
      }
    })
  }
  getAllOrders():Observable<any>{
    return this._httpClient.get("https://ecommerce.routemisr.com/api/v1/orders/")
  }
  getUserOrders(id:string):Observable<any>{
return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }
//   checkout(id:string , shippingData:object):Observable<any>{
// return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,{
//   shippingAdress:shippingData,
//   details:shippingData,
//   },
//   {
//     headers:{
//       token :`${localStorage.getItem('_token')}`
//     }
// })
// }
}
