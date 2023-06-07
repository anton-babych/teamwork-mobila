import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryType, Headphones, Phone, ShopCategory } from 'entities/products/api';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { AppProductFacade } from 'entities/products/model';
import { DeleteProductIconComponent } from 'features/deleteProduct';
import { EditProductIconComponent } from 'features/edit-product';
import { AdminFormComponent } from 'widgets/admin-form';

@Component({
  selector: 'product-tab',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tab">
      <input type="checkbox" [id]="product.model || randomId" />
      <label class="tab-label" [for]="product.model || randomId">
        {{ title }}
        <div class="tab-label-icons">
          <delete-product-icon
            *ngIf="product.id"
            [productId]="product.id"
            [category]="category"
          ></delete-product-icon>
        </div>
      </label>
      <div class="tab-content">
        <admin-form [product]="product" [category]="category" [mode]="mode"></admin-form>
      </div>
    </div>
  `,
  styles: [
    `
      $midnight: #eeeeee;
      $clouds: #ecf0f1;

      input {
        position: absolute;
        opacity: 0;
        z-index: -1;
      }

      .tab {
        width: 100%;
        color: black;
        border-color: #000;
        overflow: hidden;

        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }

        &-label {
          display: flex;
          justify-content: space-between;
          place-items: center;
          padding: 1em;
          background: $midnight;
          font-weight: bold;
          cursor: pointer;
          font-family: 'Jetbrains', sans-serif;
          font-size: 1.25rem;

          /* Icon */
          &:hover {
            background: darken($midnight, 10%);
          }

          &::before {
            content: '\\276F';
            width: 1em;
            height: 1em;
            margin-right: 2rem;
            text-align: center;
            transition: all 0.35s;
          }

          &-icons {
            display: flex;
            justify-content: center;
            place-items: center;
            gap: 1rem;
            z-index: 50;
          }
        }

        &-content {
          max-height: 0;
          padding: 0 1em;
          color: $midnight;
          background: white;
          transition: all 0.35s ease-in-out;
        }

        &-close {
          display: flex;
          justify-content: flex-end;
          padding: 1em;
          font-size: 0.75em;
          background: $midnight;
          cursor: pointer;

          &:hover {
            background: darken($midnight, 10%);
          }
        }
      }

      // :checked
      input:checked {
        + .tab-label {
          background: darken($midnight, 10%);

          &::before {
            transform: rotate(90deg);
          }
        }

        ~ .tab-content {
          max-height: 100vh;
          padding: 1em;
        }
      }
    `,
  ],
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    DeleteProductIconComponent,
    JsonPipe,
    EditProductIconComponent,
    AdminFormComponent,
  ],
})
export class ProductTabComponent {
  @Input() product!: CategoryType;
  @Input() title!: string;
  @Input() category!: ShopCategory | string;
  @Input() mode!: 'edit' | 'create';

  randomId = this.generateRandomId(6);

  generateRandomId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  }
}
