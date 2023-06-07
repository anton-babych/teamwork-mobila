import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoryProducts, Headphones, ShopCategory } from 'entities/products/api';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AppProductFacade } from 'entities/products/model';
import { DeleteProductIconComponent } from 'features/deleteProduct';
import { ProductTabsComponent } from 'widgets/products-tabs';
import { AdminFormComponent } from 'widgets/admin-form';

@Component({
  selector: 'admin-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="categories" *ngIf="productFacade.products$ | async as products">
      <div class="category" *ngFor="let category of shopCategoryStrings; trackBy: trackCategory">
        <div class="category__name">{{ category }}</div>
        <div class="category__products">
          <products-tabs [productsOfCategory]="products[category]" [category]="category"> </products-tabs>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .categories {
        padding-top: 15rem;

        display: flex;
        flex-direction: column;
        place-items: center;
      }

      .category {
        width: 100vw;
        max-width: 150rem;
        min-height: 5rem;

        display: flex;
        flex-direction: row;

        @media (max-width: 900px) {
          flex-direction: column;
        }

        &:not(last-child) {
          border-bottom: #000000 1px solid;
        }

        &__name {
          min-width: 30%;

          font-size: 5rem;
          font-family: 'JetBrains', sans-serif;
        }

        &__products {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
      }

      .product {
        width: 100%;
        height: 4rem;
        display: flex;
        flex-direction: row;
        place-items: center;
        justify-content: space-between;

        border: 1px blue solid;

        &__name {
          font-family: 'JetBrains', sans-serif;
          font-size: 2rem;

          padding-left: 2rem;
        }

        &__icons {
          padding-right: 2rem;
        }
      }
    `,
  ],
  imports: [NgForOf, AsyncPipe, NgIf, DeleteProductIconComponent, ProductTabsComponent, AdminFormComponent],
})
export class AdminPageComponent implements OnInit {
  shopCategoryStrings: string[] = Object.values(ShopCategory);

  constructor(public productFacade: AppProductFacade) {}

  ngOnInit() {}

  trackCategory(index: number, category: any) {
    return category;
  }
}
