import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'productSearch',
  standalone: true
})
export class ProductSearchPipe implements PipeTransform {

  transform(productList: Product[], userWord: string): Product[] {
    return productList.filter((item) => item.title.toLowerCase().includes(userWord.toLowerCase()));
  }

}
