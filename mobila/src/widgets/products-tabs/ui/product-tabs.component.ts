import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CategoryType, getEmptyObjectByCategory, Phone, ShopCategory } from 'entities/products/api';
import { NgForOf, NgIf } from '@angular/common';
import { ProductTabComponent } from './product-tab.component';
import { EmptyObject } from '../model';
import { AppProductFacade } from '../../../entities/products/model';

@Component({
  selector: 'products-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tabs">
      <product-tab
        *ngFor="let product of productsOfCategory; let i = index; trackBy: trackProduct"
        [title]="product.model"
        [product]="product"
        [category]="category"
        [mode]="'edit'"
      ></product-tab>
      <product-tab
        [product]="getEmptyObject()"
        [category]="category"
        [title]="'new: ' + category"
        [mode]="'create'"
      ></product-tab>
    </div>
  `,
  styles: [
    `
      .tabs {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);
      }
    `,
  ],
  imports: [NgForOf, NgIf, ProductTabComponent],
})
export class ProductTabsComponent {
  @Input() productsOfCategory!: CategoryType[];
  @Input() category!: ShopCategory | string;

  trackProduct(index: number, product: any) {
    return product ? product.id : undefined;
  }

  getEmptyObject() {
    return getEmptyObjectByCategory(this.category as ShopCategory);
  }
}
