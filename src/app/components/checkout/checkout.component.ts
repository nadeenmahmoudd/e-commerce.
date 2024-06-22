import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  id!:string
constructor(private _cartService:CartService , private _activatedRoute:ActivatedRoute){
  _activatedRoute.paramMap.subscribe((res:any)=>{
    console.log(res.get('id'));
    this.id=res.get('id')
    
  })
}
  shippingForm:FormGroup =new FormGroup({
    details:new FormControl("", [Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    phone:new FormControl("", [Validators.required,Validators.pattern(/^01[1205][0-9]{8}$/)]),
    city:new FormControl("", [Validators.required])
  })
  handelShippingForm(){
if(this.shippingForm.valid){
  this._cartService.checkOut(this.id,this.shippingForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      window.location.href=res.session.url
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
  }
}
