import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'filter-by-model-name',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filter-name">
      <input
        class="filter-name-input"
        type="text"
        id="filter-name-input"
        [(ngModel)]="inputText"
        (ngModelChange)="onInputChange($event)"
        placeholder="filter by name"
      />
    </div>
  `,
  styles: [
    `
      $primary-light: #8abdff;
      $primary: #6d5dfc;
      $primary-dark: #5b0eeb;

      $white: #ffffff;
      $greyLight-1: #e4ebf5;
      $greyLight-2: #c8d0e7;
      $greyLight-3: #bec8e4;
      $greyDark: #9baacf;
      $shadow: 0.3rem 0.3rem 0.6rem $greyLight-2, -0.2rem -0.2rem 0.5rem $white;
      $inner-shadow: inset 0.2rem 0.2rem 0.5rem $greyLight-2, inset -0.2rem -0.2rem 0.5rem $white;

      .filter-name {
        background-color: $white;
        border-radius: 0 1rem 1rem 0;

        &-input {
          &:focus {
            outline: none;
            box-shadow: $shadow;
          }

          width: 100%;
          height: 4rem;
          border: none;
          font-size: 1.4rem;
          box-shadow: $inner-shadow;
          background: none;
          font-family: inherit;
          color: $greyDark;

          &::placeholder {
            color: $greyLight-3;
          }
        }

        & label {
          font-size: 1.6rem;
          text-transform: uppercase;
          padding: 0 2rem;
          cursor: pointer;
        }
      }
    `,
  ],
})
export class FilterByModelNameComponent {
  @Output() isChanged = new EventEmitter<string>();
  inputText: string = '';

  onInputChange(value: string) {
    this.isChanged.emit(value);
  }
}
