import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, delay, Observable, skip } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CanvasItemComponent } from './canvas-item.component';
import { CategoryType, ShopCategory } from 'entities/products/api';
import { FilterConfig } from 'entities/products/model';
import { createTiles, getRandomRects, Rect } from '../lib';
import { ProductTextComponent } from './product-text.component';
import { FilterPipe } from '../../../entities/products/lib';

@Component({
  selector: 'canvas-widget',
  standalone: true,
  imports: [CommonModule, RouterLink, CanvasItemComponent, ProductTextComponent, FilterPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="canvas" id="canvas-container">
      <div id="tiles">
        <div class="tile" *ngFor="let tile of [].constructor(tilesQuantity$ | async)"></div>
      </div>
      <div class="content">
        <canvas-item
          *ngFor="let item of data | filter : filterConfig; let i = index"
          [item]="item"
          [category]="shopCategory"
          (mouseEntered)="onCanvasItemEnter($event)"
          (mouseLeaved)="onCanvasItemLeave($event)"
        >
        </canvas-item>
        <div class="item-name-container" *ngIf="productHoverState$ | async as state">
          <product-text [state]="state"></product-text>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .canvas {
        width: 100vw;
        min-height: 100vh;

        position: absolute;
        overflow: hidden;
      }

      .content {
        z-index: 5;
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        position: relative;
      }
      #tiles {
        position: absolute;
        background-color: #eeefff;
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-columns: repeat(var(--columns), 1fr);
        grid-template-rows: repeat(var(--rows), 1fr);
      }

      .tile {
        position: relative;

        &:before {
          background-color: rgb(255, 255, 255);
          content: '';
          inset: 1px;
          position: absolute;
        }
      }

      .canvas-item-pos {
        height: max-content;
        width: max-content;
      }

      .item-name-container {
        pointer-events: none;
        position: fixed;
        width: 100%;

        display: flex;
        justify-content: center;
        place-items: center;

        bottom: 0;
        z-index: 10;
      }
    `,
  ],
})
export class CanvasComponent implements AfterViewInit, OnChanges {
  @Input() data: CategoryType[] | null = [];
  @Input() filterConfig!: FilterConfig | null;
  @Input() shopCategory!: ShopCategory;

  tilesQuantity$ = new BehaviorSubject<number>(1);

  productHoverState$ = new BehaviorSubject<{ name: string; visible: boolean }>({
    name: '',
    visible: false,
  });

  ngAfterViewInit() {
    this.tilesCreate();

    window.onresize = () => this.tilesCreate();
  }

  private tilesCreate() {
    let canvas = document.getElementById('canvas-container');
    let tilesContainer = document.getElementById('tiles');

    if (!canvas) throw new Error('no canvas');
    if (!tilesContainer) throw new Error('no tiles container');
    if (!this.data) throw new Error('no data');

    createTiles(canvas, tilesContainer, this.data, 1, 3).then((x) => this.tilesQuantity$.next(x));
  }

  onCanvasItemContainerIsLoaded() {
    window.scrollTo(screen.width / 2, screen.height / 2);
  }

  onCanvasItemEnter(text: string) {
    this.productHoverState$.next({ name: text, visible: true });
  }

  onCanvasItemLeave(text: string) {
    this.productHoverState$.next({ name: text, visible: false });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let currentValue = changes['filterConfig'].currentValue;
    if (!currentValue) return;

    console.log('check');
  }
}
