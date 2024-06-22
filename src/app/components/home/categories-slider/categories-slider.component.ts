import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/interfaces/product';
import { ProductsDataService } from 'src/app/services/products-data.service';

@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrls: ['./categories-slider.component.css']
})
export class CategoriesSliderComponent {
  constructor(private _productsDataService:ProductsDataService){}
  allCategories:Category[]=[]
  ngOnInit(){
    this.getAllCategories()
  }
getAllCategories(){
  this._productsDataService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.allCategories=res.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 8
    },
    // 400: {
    //   items: 2
    // },
    // 740: {
    //   items: 3
    // },
    // 940: {
    //   items: 4
    // }
  },
  nav: true
}
}
