import { Component } from '@angular/core';
import { Brand } from 'src/app/interfaces/brand';
import { Product } from 'src/app/interfaces/product';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
constructor(private _brandsService:BrandsService){}
ngOnInit(){
  this.getBrands()
}
brandItem!:Brand[]
imagePath:any
imageSlug:any
itemName:any
getBrands(){
  this._brandsService.getBrands().subscribe({
    next:(res)=>{
      console.log(res);
      this.brandItem=res.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}
