import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryType, ShopCategory } from 'entities/products/api';
import { gsap } from 'gsap';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'product-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <p class="item-name">
      <span>{{ state.name }}</span>
    </p>
  `,
  styles: [
    `
      .item-name {
        font-family: 'JetBrains', sans-serif;
        font-size: 13vw;
        overflow: hidden;

        & span {
          transform: translateY(-100%);
          display: block;
        }
      }
    `,
  ],
})
export class ProductTextComponent implements OnChanges {
  @Input() state: { name: string; visible: boolean } = { name: 'test', visible: false };

  ngAfterViewInit(): void {
    this.animateIn();
  }

  private animateIn() {
    gsap.to('.item-name span', { yPercent: 0 });
  }

  private animateOut() {
    gsap.to('.item-name span', { yPercent: -100 });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let stateChanges: { name: string; visible: boolean } | undefined =
      changes['state'].currentValue || undefined;

    if (!stateChanges) return;

    stateChanges.visible ? this.animateIn() : this.animateOut();
  }
}
