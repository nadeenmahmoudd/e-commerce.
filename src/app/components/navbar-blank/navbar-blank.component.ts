import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css']
})
export class NavbarBlankComponent {
   constructor( private _router:Router, private _cartService:CartService){}
  signOut(){
    localStorage.removeItem('_token')
    this._router.navigate(['/login'])
  }
  numberOfItems:number=0
  ngOnInit(){
    this._cartService.cartItems.subscribe((res)=>{
      this.numberOfItems=res
    })
  }
}
