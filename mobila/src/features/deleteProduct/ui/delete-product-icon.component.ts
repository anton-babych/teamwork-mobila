import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CategoryProducts, Headphones, ShopCategory } from 'entities/products/api';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AppProductFacade } from 'entities/products/model';
import { AlertMessageComponent } from 'shared/ui/alert-message';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'delete-product-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      src="assets/icons/delete-button.svg"
      alt="delete icon"
      class="delete-icon"
      (click)="this.isMessageVisible$.next(true)"
    />

    <alert-message
      *ngIf="isMessageVisible$ | async"
      [title]="'delete product with id ' + productId + '?'"
      (isAccepted)="confirmDelete()"
      (isClosed)="isMessageVisible$.next(false)"
    >
    </alert-message>
  `,
  styles: [
    `
      .delete-icon {
        height: 2rem;
        cursor: pointer;
      }
    `,
  ],
  imports: [NgForOf, AsyncPipe, NgIf, AlertMessageComponent],
})
export class DeleteProductIconComponent {
  @Input() productId!: string;
  @Input() category!: ShopCategory | string;
  isMessageVisible$ = new BehaviorSubject<boolean>(false);

  constructor(private productFacade: AppProductFacade) {}

  confirmDelete() {
    this.productFacade.deleteProductById(this.category as ShopCategory, this.productId);
  }
}
