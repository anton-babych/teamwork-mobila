import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

import { CanvasComponent } from 'widgets/canvas';
import { FilterProductsComponent } from 'widgets/filter-products';
import { AppProductFacade, FilterConfig } from 'entities/products/model';
import { ShopCategory } from 'entities/products/api';
import { FilterButtonComponent } from 'features/filter-button';

@Component({
  selector: 'shop-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, CommonModule, CanvasComponent, FilterProductsComponent, FilterButtonComponent],
  template: `
    <div class="page-container">
      <ng-container *ngIf="productFacade.loaded$ | async; else loading">
        <ng-container *ngIf="productFacade.products$ | async as products; else noProducts">
          <ng-container *ngIf="filterConfig$ | async as filterConfig">
            <canvas-widget
              [data]="products[filterConfig.category]"
              [filterConfig]="filterConfig$ | async"
              [shopCategory]="filterConfig.category"
            ></canvas-widget>
          </ng-container> </ng-container
      ></ng-container>
    </div>
    <div class="filter-products-container" *ngIf="filterShown$ | async">
      <filter-products (isSubmitted)="onFilterSubmitted($event)"></filter-products>
    </div>

    <div class="filter-icon"><filter-button (isClicked)="filterShown$.next($event)"></filter-button></div>

    <ng-template #loading><p class="status-text">loading...</p></ng-template>
    <ng-template #noProducts> <p class="status-text">There is no products</p> </ng-template>
  `,
  styles: [
    `
      .page-container {
        overflow: hidden;
      }

      .filter-products-container {
        position: fixed;
        right: 4rem;
        transform: translateX(-50%);
        bottom: 2rem;

        z-index: 50;
      }

      .status-text {
        position: relative;
        font-size: 2rem;
        padding: 2rem;
      }

      .filter-icon {
        position: fixed;
        top: 5rem;
        right: 1rem;

        z-index: 10;
      }
    `,
  ],
})
export class ShopPageComponent implements OnInit {
  filterConfig$ = new BehaviorSubject<FilterConfig>({ category: ShopCategory.Phones });
  filterShown$ = new BehaviorSubject<boolean>(false);

  constructor(
    public productFacade: AppProductFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('query params parse', params);

      let category: string | undefined = params['category'];
      if (category && category in ShopCategory) {
        this.applyToFilterCategory(category as ShopCategory);
      }

      let name: string | undefined = params['name'];
      if (name) {
        this.applyToFilterName(name);
      }
    });

    this.filterConfig$.subscribe((x) => {
      console.log('filet config changed');
      this.applyQueryParams();
    });
  }

  private applyQueryParams() {
    console.log('applyQueryParams');

    const queryParams: NavigationExtras = {
      queryParams: {},
    };

    if (this.filterConfig$.value.category) {
      queryParams.queryParams = {
        ...queryParams.queryParams,
        category: this.filterConfig$.value.category,
      };
    }

    if (this.filterConfig$.value.maxPrice !== undefined) {
      queryParams.queryParams = {
        ...queryParams.queryParams,
        maxPrice: this.filterConfig$.value.maxPrice.toString(),
      };
    }

    if (this.filterConfig$.value.minPrice !== undefined) {
      queryParams.queryParams = {
        ...queryParams.queryParams,
        minPrice: this.filterConfig$.value.minPrice.toString(),
      };
    }

    if (this.filterConfig$.value.name) {
      queryParams.queryParams = {
        ...queryParams.queryParams,
        name: this.filterConfig$.value.name,
      };
    }

    this.router.navigate([], queryParams);
  }

  onFilterSubmitted(filterConfig: FilterConfig) {
    this.filterConfig$.next(filterConfig);
  }

  private applyToFilterCategory(category: ShopCategory) {
    this.filterConfig$.next({ ...this.filterConfig$.value, category: category });
  }

  private applyToFilterName(name: string) {
    this.filterConfig$.next({ ...this.filterConfig$.value, name: name });
  }
}
