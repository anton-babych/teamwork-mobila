import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'hamburger',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, NgClass],
  template: `
    <div
      class="hamburger"
      id="hamburger-1"
      (click)="handleClick()"
      [ngClass]="{ 'is-active': isActive$ | async }"
    >
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
  `,
  styles: [
    `
      $dark: black;
      $light: red;

      .hamburger .line {
        background-color: $dark;
        width: 3rem;
        height: 0.25rem;
        display: block;
        margin: 8px auto;
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
      }

      .hamburger:hover {
        cursor: pointer;
      }

      #hamburger-1.is-active .line:nth-child(2) {
        opacity: 0;
      }

      #hamburger-1.is-active .line:nth-child(1) {
        background-color: $light;
        opacity: 1;
        -webkit-transform: translateY(13px) rotate(45deg);
        -ms-transform: translateY(13px) rotate(45deg);
        -o-transform: translateY(13px) rotate(45deg);
        transform: translateY(13px) rotate(45deg);
      }

      #hamburger-1.is-active .line:nth-child(3) {
        background-color: $light;
        opacity: 1;
        -webkit-transform: translateY(-13px) rotate(-45deg);
        -ms-transform: translateY(-13px) rotate(-45deg);
        -o-transform: translateY(-13px) rotate(-45deg);
        transform: translateY(-13px) rotate(-45deg);
      }
    `,
  ],
})
export class HamburgerComponent implements OnChanges {
  @Input() toOpen: boolean | null = false;
  @Output() isClicked = new EventEmitter();

  isActive$ = new BehaviorSubject<boolean>(false);

  ngOnChanges(changes: SimpleChanges): void {
    let value = changes['toOpen'];
    if (!value) return;
    this.isActive$.next(value.currentValue);
  }

  handleClick() {
    this.isClicked.emit();
  }
}
