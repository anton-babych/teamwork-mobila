import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryType, ShopCategory } from 'entities/products/api';
import { FilteredProduct } from 'entities/products/model';
import { Rect } from '../lib';

@Component({
  selector: 'canvas-item[item][category]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="canvas-item-container">
      <img
        class="canvas-item {{ item.enabled ? 'canvas-item__enabled' : 'canvas-item__disabled' }}"
        [routerLink]="['/', category, item.payload.id]"
        [src]="item.payload.imagePath"
        [alt]="item.payload.model"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
      />
    </div>
  `,
  styles: [
    `
      .canvas-item-container {
        margin: 10rem;
      }
      .canvas-item {
        height: 300px;
        z-index: 8;
        transition: transform 0.25s ease-in-out, opacity 0.5s ease-in-out;
        box-shadow: rgba(61, 61, 61, 0.27) 5px 5px 15px;
        cursor: pointer;

        &__enabled {
          &:hover {
            transform: scale(1.2);
            z-index: 10;
          }
        }

        &__disabled {
          filter: grayscale(1);
          opacity: 0.5;
        }
      }
    `,
  ],
})
export class CanvasItemComponent {
  @Input() item!: FilteredProduct;
  @Input() category!: ShopCategory;

  @Output() mouseEntered = new EventEmitter<string>();
  @Output() mouseLeaved = new EventEmitter();

  onMouseEnter() {
    if (!this.item.enabled) return;
    this.mouseEntered.emit(this.item.payload.model);
  }

  onMouseLeave() {
    if (!this.item.enabled) return;
    this.mouseLeaved.emit(this.item.payload.model);
  }
}
