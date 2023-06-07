import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { gsap } from 'gsap';
import { AnimatedCustomizableTextComponent } from 'shared/ui/animated-customizable-text';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'menu-content',
  standalone: true,
  imports: [AsyncPipe, NgIf, AnimatedCustomizableTextComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="contentIsShown$ | async as ready" class="menu-content">
      <div class="menu-content__links">
        <div class="menu-content__link">
          <animated-customizable-text
            [text]="'home'"
            [fontSizeExpression]="'20vh'"
            (click)="navigate('/home')"
          ></animated-customizable-text>
        </div>
        <div class="menu-content__link">
          <animated-customizable-text
            [text]="'shop'"
            [fontSizeExpression]="'20vh'"
            (click)="navigate('/shop')"
          ></animated-customizable-text>
        </div>
        <div class="menu-content__link">
          <animated-customizable-text
            [text]="'admin'"
            [fontSizeExpression]="'20vh'"
            (click)="navigate('/admin')"
          ></animated-customizable-text>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .menu-content {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: white;
        opacity: 0;
        z-index: 199;

        &__links {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          padding-left: 20vw;
        }
      }
    `,
  ],
})
export class MenuContentComponent implements OnChanges {
  @Input() isOpenState!: boolean | null;
  @Output() isClicked = new EventEmitter();

  contentIsShown$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['isOpenState'];
    if (!change) return;

    if (change.currentValue) {
      this.contentIsShown$.next(true);
      setTimeout(() => {
        this.animateIn();
      }, 3);
    } else {
      this.animateOut().then(() => this.contentIsShown$.next(false));
    }
  }

  private animateIn() {
    gsap.to('.menu-content', { opacity: 1 });
  }

  private animateOut() {
    return new Promise<void>((resolve) => {
      gsap.to('.menu-content', { opacity: 0, onComplete: () => resolve() });
    });
  }

  navigate(path: string) {
    this.router.navigate([path]).then(() => {
      this.isClicked.emit();
      this.animateOut().then(() => this.contentIsShown$.next(false));
    });
  }
}
