import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'add-basket-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="btn" (click)="handleBasketButtonClick()"><span class="btn__text">add</span></div> `,
  styles: [
    `
      .btn {
        width: 20rem;
        background-color: #282828;
        display: flex;
        justify-content: center;
        place-items: center;
        cursor: pointer;

        &:hover {
        }

        &__text {
          padding: 2rem 0;
          color: white;
          font-weight: 500;
          font-size: 2rem;
        }
      }
    `,
  ],
  imports: [],
})
export class AddBasketButtonComponent {
  handleBasketButtonClick() {}
}
