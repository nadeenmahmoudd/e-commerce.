import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { ToastrService } from 'ngx-toastr';
import { FavouriteService } from 'src/app/services/favourite.service';
import { Cart } from 'src/app/interfaces/cart';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.css']
})
export class FeaturedProductComponent {
constructor(private _productsDataService:ProductsDataService , private _cartService:CartService 
  ,private toastr: ToastrService , private _favouriteService: FavouriteService 
  ,){}
  favItems:BehaviorSubject<boolean>=new BehaviorSubject(false)

isLoading:boolean=false;
searchTerm:string="";
allProducts:Product[]=[]
isHeartClicked :any
id:any
favouriteItems:any=[]
ngOnInit(){
  this.getProducts();
  this.isHeartClicked=this._favouriteService.favItems;
  // this._favouriteService.showFav().subscribe({
  //   next:(res)=>{
  //         this.favItems=res
  //         this.isHeartClicked=this._favouriteService.favItems;
  //       }
  // })
}
getProducts(){
  this.isLoading=true
  this._productsDataService.getAllProducts().subscribe({
    next:(res)=>{
      this.isLoading=false
      console.log(res.data);
      this.allProducts= res.data;
    },
    error:(err)=>{
      this.isLoading=false
      console.log(err);
    }
  })
}
addToCart(productId:string){
  this._cartService.addToCart(productId).subscribe({
    next:(res)=>{

      console.log(res);
      this._cartService.cartItems.next(res.numOfCartItems)
      this.toastr.success(res.message, '',{
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

addToFav(id:string){
  this.isHeartClicked = !this.isHeartClicked;
this._favouriteService.addToFav(id).subscribe({
next:(res)=>{
  this.isHeartClicked = !this.isHeartClicked;
  console.log(res)
  this.favouriteItems=res.data
  this.toastr.success(res.message, '',{
    timeOut:2000,
    progressBar:true,
    positionClass:'toast-bottom-right'
  });
},
error:(err)=>{
  console.log(err);
  
}
})
}
item:Product[]=[]
removeItem(id:string){
  this._favouriteService.removeItem(id).subscribe({
next:(res)=>{
console.log(res);
this.item=res //lama hane3mel remove hateb3atle cart gededa
this.favouriteItems=res.data
this.toastr.success(res.message, '',{
  timeOut:2000,
  progressBar:true,
  positionClass:'toast-bottom-right'
});
},
error:(err)=>{
  console.log(err);
  
}
  })
}
showFav(){
  this._favouriteService.showFav().subscribe({
    next:(res)=>{
      console.log(res);
this.favouriteItems=res.data._id
      
    }
  })
}
}
