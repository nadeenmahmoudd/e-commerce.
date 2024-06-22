import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../interfaces/cart';
import { FavouriteService } from '../services/favourite.service';
import { Favourite } from '../interfaces/favourite';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent {
  constructor(private _cartService:CartService , private _favouriteService:FavouriteService){}
  toastr: any;
  isLoading:boolean=false
favouriteItems: any; 
  ngOnInit(){
  this.showFav()
}
showFav(){
this._favouriteService.showFav().subscribe({
  next:(res)=>{
    console.log(res);
    this.favouriteItems=res.data
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}

  addToCart(productId:string){
    this._cartService.addToCart(productId).subscribe({
      next:(res)=>{
        console.log(res);
        this.favouriteItems=res.data
        this.toastr.success("added successfully", '',{
          timeOut:2000,
          progressBar:true,
          positionClass:'toast-bottom-right'
        });
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error(err.message, '',{
          timeOut:2000,
          progressBar:true,
          positionClass:'toast-bottom-left'
        });
        
      }
    })
  }
  removeItem(id:string){
    this.isLoading=true
    this._favouriteService.removeItem(id).subscribe({
  next:(res)=>{
    this.isLoading=false
  console.log(res);
  this.favouriteItems=res.data //lama hane3mel remove hateb3atle cart gededa
  },
  error:(err)=>{
    this.isLoading=false
    console.log(err);
    
  }
    })
  }
  
}
