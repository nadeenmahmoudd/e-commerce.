import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
constructor(private _cartService:CartService){}
ngOnInit(){
  this.getCart();
}
cart!:Cart
getCart(){
  this._cartService.getCart().subscribe({
    next:(res)=>{
      console.log(res);
      this.cart=res
    },
    error:err=>{
      console.log(err);
    }
  })
}
updateCart(id:string , count:number){
 if(count >0){
  this._cartService.updateCartProductQuantity(id,count).subscribe({
    next:(res)=>{
console.log(res);
this.cart=res // de 3ashan nekhale el cart tesawy el cart el gededa bel taghyrat el feha
    },
    error:(err)=>{
console.log(err);

    }
  })
 }
 else{
  this.removeItem(id)
  
 }
}
removeItem(id:string){
  this._cartService.removeItem(id).subscribe({
next:(res)=>{
console.log(res);
this.cart=res //lama hane3mel remove hateb3atle cart gededa
},
error:(err)=>{
  console.log(err);
  
}
  })
}
}
