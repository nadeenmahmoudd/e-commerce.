import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {
  id!:string
  constructor(private _cartService:CartService ,private _activatedRoute:ActivatedRoute){
    this._activatedRoute.paramMap.subscribe((res:any)=>{
      console.log(res.get('id'));
      this.id=res.get('id')
    })
  }
  ngOnInit(){
    this.getAllOrders()
    this.getUserOrders(this.id)
  }
  i!:number
  cart!:any
  items:any[]=[]
  getAllOrders(){
    this._cartService.getAllOrders().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.items=res.data
        this.i=res.data.cartItems.count
      },
      error:err=>{
        console.log(err);
      }
    })
  }
getUserOrders(id:string){
  this._cartService.getUserOrders(id).subscribe({
    next:(res)=>{
      console.log(res.data);
      this.items=res.data
    },
    error:err=>{
      console.log(err);
    }
  })
}
}
