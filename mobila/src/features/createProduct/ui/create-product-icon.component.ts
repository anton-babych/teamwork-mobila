import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CategoryProducts, CategoryType, Headphones, ShopCategory } from 'entities/products/api';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AppProductFacade } from 'entities/products/model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'create-product-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      src="assets/icons/delete-button.svg"
      alt="delete icon"
      class="delete-icon"
      (click)="handleIconClick()"
    />
  `,
  styles: [
    `
      .create-icon {
        height: 2rem;

        cursor: pointer;
      }
    `,
  ],
  imports: [NgForOf, AsyncPipe, NgIf],
})
export class CreateProductIconComponent {
  @Input() product!: CategoryType;
  @Input() category!: ShopCategory | string;

  constructor(private productFacade: AppProductFacade) {}

  handleIconClick() {
    this.productFacade.createProduct(this.category as ShopCategory, this.product);
  }
}
