import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { gsap } from 'gsap';

@Component({
  selector: 'alert-message[title]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, NgIf],
  template: `
    <div class="message">
      <div class="message__title">{{ title }}</div>
      <div class="message__content"><ng-container></ng-container></div>
      <div class="message__buttons">
        <button (click)="onAccept()">yes</button>
        <button (click)="onClose()">no</button>
      </div>
    </div>
  `,
  styles: [
    `
      $message-color: #2f2f2f;

      .message {
        position: fixed;
        z-index: 150;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 5rem;
        min-height: 4rem;
        background-color: $message-color;
        border-radius: 0.5rem;
        box-shadow: 0 0 25px darken($message-color, 50%);

        display: flex;
        flex-direction: column;

        &__content {
        }

        &__buttons {
          background-color: darken($message-color, 10%);
          display: flex;
          justify-content: space-evenly;

          & button {
            flex: 1;
            padding: 1rem 0;
          }
        }

        &__title {
          text-align: center;
          font-family: 'Jetbrains', sans-serif;
          font-weight: 100;
          font-size: 2rem;
          padding: 2rem;
        }
      }
    `,
  ],
})
export class AlertMessageComponent implements AfterViewInit {
  @Input() title: string = '';
  @Output() isClosed = new EventEmitter();
  @Output() isAccepted = new EventEmitter();

  ngAfterViewInit(): void {
    this.animateIn();
  }

  onClose() {
    this.animateOut();
  }

  private animateIn() {
    gsap.fromTo('.message', { opacity: 0 }, { opacity: 1 });
  }

  private animateOut() {
    gsap.fromTo('.message', { opacity: 1 }, { opacity: 0, onComplete: () => this.isClosed.emit() });
  }

  onAccept() {
    this.isAccepted.emit();
    this.animateOut();
  }
}
