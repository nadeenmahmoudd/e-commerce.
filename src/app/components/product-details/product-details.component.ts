import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
constructor(private _activatedRoute:ActivatedRoute , private _productsDataService:ProductsDataService , private _cartService:CartService){}

id:string="";
product!:Product;
isLoadin:boolean=false;
ngOnInit(){
  this._activatedRoute.paramMap.subscribe((res:any)=>{
    console.log(res.get('id'))
    this.id=res.get('id')
  })
  this.showProductDetails()
}
showProductDetails(){
  this.isLoadin=true
  this._productsDataService.getProductById(this.id).subscribe({
    next:(res)=>{
      
      console.log(res.data);
      this.product=res.data;
      this.isLoadin=false
    },
    error:(err)=>{
      this.isLoadin=false
      console.log(err);
    }
  })
}
customOptions: OwlOptions = {
  // autoplay:true,
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}

addToCart(productId:string){
  this._cartService.addToCart(productId).subscribe({
    next:(res)=>{
      console.log(res);
    },
    error(err) {
      console.log(err);
      
    },
  })
}}

