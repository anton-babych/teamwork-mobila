import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryType, Phone, ShopCategory } from '../../entities/products/api';
import { AppProductFacade } from 'entities/products/model';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { AddBasketButtonComponent } from 'features/addProductToBasket';

@Component({
  selector: 'item-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="item" *ngIf="item$ | async as item">
      <div class="item__images">
        <img class="item__images__image" [src]="item.imagePath" alt="image" />
      </div>
      <div class="item__main">
        <p class="item__main-name mb-10">{{ item.firm }} {{ item.model }}</p>
        <p class="item__main-price mb-10">{{ item.price }} uah</p>
        <p class="item__main-description mb-10">
          {{ item.description }}
        </p>

        <div class="item__main-basket-btn">
          <add-basket-button></add-basket-button>
        </div>

        <ng-container *ngIf="compatibleProducts$ | async as compatibleProducts">
          <div class="compatible-section" *ngIf="compatibleProducts.length">
            <p class="compatible-section__title">usually comes with:</p>
            <div class="compatible-section__content">
              <div
                class="compatible-section__item"
                *ngFor="let product of compatibleProducts"
                [routerLink]="['/', getOpositeCategory(), product.id]"
              >
                <img alt="" [src]="product.imagePath" class="compatible-section__item__image" />
                <div class="compatible-section__item__name">{{ product.firm + product.model }}</div>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [
    `
      .compatible-section {
        width: 100%;

        &__title {
          font-size: 1.5rem;
          font-weight: 500;
          text-align: center;

          margin-bottom: 2rem;
        }

        &__content {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }

        &__item {
          cursor: pointer;
          border: 0.5px solid black;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          place-items: center;
          &__image {
            height: 15rem;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;

            margin-bottom: 2rem;
          }
          &__name {
            font-size: 1.3rem;
          }
        }
      }

      .item {
        display: flex;
        height: 100vh;
        width: 100%;
        overflow: hidden;

        &__images {
          width: 40%;
          height: 100%;
          overflow: scroll;

          &__image {
            width: 100%;
            &:not(last-child) {
              border-bottom: 1px black solid;
            }
          }
        }
        &__main {
          width: 60%;
          height: 100%;
          overflow: scroll;

          display: flex;
          flex-direction: column;
          justify-content: center;
          place-items: center;
          padding-right: 5rem;

          &-name {
            font-size: 3rem;
            font-weight: 900;
            text-transform: uppercase;
          }

          &-price {
            font-size: 3rem;
          }

          &-description {
            font-size: 1.3rem;
          }

          &-category {
          }

          &-basket-btn {
            margin-bottom: 10rem;
          }
        }
      }

      .mb-10 {
        margin-bottom: 1rem;
      }
    `,
  ],
  imports: [NgIf, AsyncPipe, JsonPipe, NgForOf, NgSwitch, NgSwitchCase, AddBasketButtonComponent, RouterLink],
})
export class ItemPageComponent implements OnInit, OnDestroy {
  shopCategory = ShopCategory;

  item$ = new BehaviorSubject<CategoryType>({} as Phone);
  category$ = new BehaviorSubject<ShopCategory>(ShopCategory.Phones);
  compatibleProducts$ = new BehaviorSubject<CategoryType[]>([]);

  private isDestroyed$ = new Subject<void>();
  private isItemChanged$: Subject<void> = new Subject<void>();

  constructor(
    private productFacade: AppProductFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initItem();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isItemChanged$.next();
      this.initItem();
    });
  }

  private initItem() {
    const { category, id } = this.parseItemFromUrl();
    this.getItem(category, id);

    this.item$.pipe(takeUntil(this.isItemChanged$)).subscribe((x) => {
      console.log('looking for compatible');
      if (!x.id) return;
      this.productFacade
        .loadCompatibleProducts(x.id, this.category$.value, this.getOpositeCategory())
        .pipe(takeUntil(this.isItemChanged$))
        .subscribe((a) => {
          if (!a) return;
          this.compatibleProducts$.next(a);
          console.log('compatible ', a);
        });
    });
  }

  private parseItemFromUrl(): { category: ShopCategory; id: string } {
    let stringCategory: string | null = this.route.snapshot.paramMap.get('category');
    let id: string | null = this.route.snapshot.paramMap.get('id');

    if (!(stringCategory && id)) throw new Error('no id or category');
    //if (!(stringCategory in ShopCategory)) throw new Error('string is not shopCategory');

    let category: ShopCategory = stringCategory as ShopCategory;

    return { category, id };
  }

  private getItem(category: ShopCategory, id: string) {
    this.productFacade
      .getProductById(category, id)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((x) => {
        if (!x) return;
        this.item$.next(x);
        this.category$.next(category);
      });
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
  }

  getOpositeCategory() {
    switch (this.category$.value) {
      case ShopCategory.Phones:
        return ShopCategory.Headphones;
      case ShopCategory.Headphones:
        return ShopCategory.Phones;
    }
  }
}
