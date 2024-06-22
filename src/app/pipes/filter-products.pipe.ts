import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products:Product[], searchTerm:string):Product[] {
    return products.filter((element)=>element.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  }

}
