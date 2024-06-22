import { Component } from '@angular/core';
import { Category } from 'src/app/interfaces/product';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  isload:boolean=false
  ngOnInit(){
    this.getCategories()
  }
  categories!:Category[]
constructor( private _categoriesService:CategoriesService){}

getCategories(){
  this.isload=true;
  this._categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      this.isload=false;
      console.log(res);
      this.categories=res.data
    },
    error:(err)=>{
      console.log(err);
      this.isload=false;
    }
  })
}
}
