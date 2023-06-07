import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'edit-product-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <img src="assets/icons/edit-button.svg" alt="edit icon" class="edit-icon" (click)="handleIconClick()" />
  `,
  styles: [
    `
      .edit-icon {
        width: 1.9rem;
      }
    `,
  ],
})
export class EditProductIconComponent {
  handleIconClick() {}
}
