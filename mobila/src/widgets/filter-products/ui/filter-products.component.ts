import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FilterConfig } from 'entities/products/model';
import { FilterByModelNameComponent } from 'features/filterByName';
import { FilterByPriceComponent } from 'features/filterByPrice';
import { FilterByCategoryComponent } from 'features/filterByCategory';
import { ShopCategory } from 'entities/products/api';

@Component({
  selector: 'filter-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FilterByModelNameComponent, FilterByPriceComponent, FilterByCategoryComponent],
  template: `
    <div class="filter">
      <div class="filter__part">
        <p class="filter__text">model name</p>
        <filter-by-model-name (isChanged)="handleFilterByNameChange($event)"></filter-by-model-name>
      </div>

      <!--      <div class="filter__part">-->
      <!--        <p class="filter__text">price range</p>-->
      <!--        <filter-by-price></filter-by-price>-->
      <!--      </div>-->

      <div class="filter__part">
        <p class="filter__text">category</p>
        <filter-by-category (isChanged)="handleFilterByCategoryChange($event)"></filter-by-category>
      </div>

      <button class="filter__btn" (click)="handleSubmitClick()">submit</button>
    </div>
  `,
  styles: [
    `
      .filter {
        background-color: rgba(255, 255, 255, 0.34);
        border: 1px black solid;
        width: 20rem;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        place-items: center;

        &__btn {
          display: inline;
        }

        &__part {
          margin-bottom: 2rem;

          display: flex;
          flex-direction: column;
          justify-content: right;
          place-items: center;
        }

        &__text {
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class FilterProductsComponent {
  @Output() isSubmitted = new EventEmitter<FilterConfig>();
  filterConfig: FilterConfig = { category: ShopCategory.Phones };

  handleSubmitClick() {
    this.isSubmitted.next({ ...this.filterConfig });
  }

  handleFilterByNameChange(value: string) {
    this.filterConfig.name = value;
  }

  handleFilterByCategoryChange(category: ShopCategory) {
    this.filterConfig.category = category;
  }
}
