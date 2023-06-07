import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HamburgerComponent } from 'shared/ui/hamburger';
import { BehaviorSubject } from 'rxjs';
import { MenuContentComponent } from './menu-content.component';
import { MenuContentState } from '../lib/models';

@Component({
  selector: 'menu-hamburger',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, HamburgerComponent, AsyncPipe, NgIf, MenuContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="menu-container">
      <hamburger [toOpen]="isOpenState$ | async" (isClicked)="onClick()"></hamburger>
    </div>

    <menu-content [isOpenState]="isOpenState$ | async" (isClicked)="onClick()"></menu-content>
  `,
  styles: [
    `
      .menu-container {
        position: fixed;
        top: 1rem;
        right: 2rem;

        z-index: 200;
      }

      .menu-content {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: purple;

        z-index: 199;
      }
    `,
  ],
})
export class MenuHamburgerComponent {
  isOpenState$ = new BehaviorSubject<boolean>(false);

  onClick() {
    this.isOpenState$.next(!this.isOpenState$.value);
  }
}
