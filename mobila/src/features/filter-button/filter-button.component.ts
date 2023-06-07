import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'filter-button',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filter-button">
      <img class="filter-button__icon" src="assets/icons/filter.svg" alt="filter icon" (click)="OnClick()" />
    </div>
  `,
  styles: [
    `
      .filter-button {
        width: 5rem;
        height: 5rem;
        display: flex;
        justify-content: center;
        place-items: center;
        cursor: pointer;

        &__icon {
          width: 3rem;
        }
      }
    `,
  ],
})
export class FilterButtonComponent {
  @Output() isClicked = new EventEmitter<boolean>();

  toOpen: boolean = false;

  OnClick() {
    this.toOpen = !this.toOpen;
    this.isClicked.emit(this.toOpen);
  }
}
