import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopCategory } from 'entities/products/api';
import { AsyncPipe, NgForOf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'filter-by-category',
  standalone: true,
  imports: [FormsModule, NgForOf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dropdown">
      <button class="dropbtn">{{ currentCategory$ | async }}</button>
      <div class="dropdown-content">
        <a *ngFor="let category of shopCategories" (click)="OnClick(category)">{{ category }}</a>
      </div>
    </div>
  `,
  styles: [
    `
      .dropdown {
        width: 15rem;
        display: block;
      }
      .dropbtn {
        background-color: #c7c7c7;
        color: white;
        width: 100%;
        padding: 2rem 0;
        font-size: 12px;
        border: none;
        cursor: pointer;
      }

      .dropdown {
        position: relative;
        display: inline-block;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
      }

      .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
      }

      .dropdown-content a:hover {
        background-color: #f1f1f1;
      }

      .dropdown:hover .dropdown-content {
        display: block;
      }

      .dropdown:hover .dropbtn {
        background-color: #3e8e41;
      }
    `,
  ],
})
export class FilterByCategoryComponent {
  shopCategories = Object.values(ShopCategory);
  currentCategory$ = new BehaviorSubject<ShopCategory | null>(this.shopCategories[0]);
  @Output() isChanged = new EventEmitter<ShopCategory>();

  OnClick(category: string) {
    this.currentCategory$.next(category as ShopCategory);
    this.isChanged.emit(category as ShopCategory);
  }
}
