import { Pipe, PipeTransform } from '@angular/core';
import { CategoryType } from '../api';
import { FilterConfig, FilteredProduct } from '../model';
import { max } from 'rxjs';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(products: CategoryType[] | null, filterConfig: FilterConfig | null): FilteredProduct[] {
    console.log('filter inside');
    if (!products) return [];

    if (!filterConfig) {
      return products.map((product) => ({
        payload: product,
        enabled: true,
      }));
    }

    let check = products.map((product) => {
      let isEnabled = true;

      if (filterConfig.name) {
        let name = filterConfig.name?.toLowerCase() || '';
        isEnabled = product.model.toLowerCase().includes(name);
      }

      console.log('filter inside', isEnabled, 'after name');

      // if (filterConfig.maxPrice) {
      //   let maxPrice = filterConfig.maxPrice || 1000000;
      //   isEnabled = isEnabled || product.price <= maxPrice;
      // }
      //
      // if (filterConfig.minPrice) {
      //   let minPrice = filterConfig.minPrice || 0;
      //   isEnabled = isEnabled || product.price >= minPrice;
      // }

      return {
        payload: product,
        enabled: isEnabled,
      };
    });

    console.log(check, 'filter check');

    return check;
  }
}
