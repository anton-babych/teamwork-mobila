import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgSwitch, NgSwitchCase } from '@angular/common';

import { AppProductFacade } from 'entities/products/model';
import { CategoryType, Headphones, Phone, ShopCategory } from 'entities/products/api';

import { HeadphonesFormComponent } from 'features/headphones-form';
import { SmartphoneFormComponent } from 'features/phone-form';

@Component({
  selector: 'admin-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [ngSwitch]="category">
      <ng-container *ngSwitchCase="shopCategory.Headphones">
        <headphones-form
          [item]="product"
          (isSubmitted)="onHeadphonesSubmitted($event.product, $event.smartphoneId)"
        >
        </headphones-form
      ></ng-container>
      <ng-container *ngSwitchCase="shopCategory.Phones">
        <smartphones-form [item]="product" (isSubmitted)="onSmartphoneSubmitted($event)"></smartphones-form>
      </ng-container>
    </ng-container>
  `,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    HeadphonesFormComponent,
    SmartphoneFormComponent,
  ],
})
export class AdminFormComponent {
  shopCategory = ShopCategory;
  @Input() product!: CategoryType;
  @Input() mode!: 'create' | 'edit';
  @Input() category!: ShopCategory | string;
  @Output() isSubmitted = new EventEmitter<CategoryType>();

  constructor(private productFacade: AppProductFacade) {}

  onHeadphonesSubmitted(product: Headphones, smartphoneId: string) {
    switch (this.mode) {
      case 'create':
        console.log('headphones created', product);
        this.productFacade.createProductToOtherCategory(
          ShopCategory.Phones,
          smartphoneId,
          ShopCategory.Headphones,
          product
        );
        break;
      case 'edit':
        this.productFacade.updateProduct(ShopCategory.Headphones, product);
        break;
    }
  }

  onSmartphoneSubmitted(phone: Phone) {
    switch (this.mode) {
      case 'create':
        this.productFacade.createProduct(ShopCategory.Phones, phone);
        break;
      case 'edit':
        this.productFacade.updateProduct(ShopCategory.Phones, phone);
        break;
    }
  }
}
