import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'filter-by-price',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <input id="slider" [multiple]="true" type="range" min="4" max="32" value="16" /> `,
  styles: [``],
})
export class FilterByPriceComponent {}
