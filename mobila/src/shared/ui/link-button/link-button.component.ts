import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'link-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  template: `
    <a class="link-btn" [href]="routerText" [routerLink]="routerText">
      <span class="text">start now</span>
      <span class="line -right"></span>
      <span class="line -top"></span>
      <span class="line -left"></span>
      <span class="line -bottom"></span>
    </a>
  `,
  styles: [
    `
      $thick: 3px;
      $pad: 0.7em;
      $extra: calc(#{$pad} * 1.2);
      $color: #1f1f1f;
      $text-color: #4f4f4f;

      a {
        color: white;
        padding: $pad $extra;
        display: inline-block;
        border: $thick solid transparent;
        position: relative;
        font-size: 1.5em;
        cursor: pointer;
        letter-spacing: 0.07em;

        .text {
          color: $text-color;
          font-weight: 1000;
          font-family: proxima-nova, monospace;
          transform: translate3d(0, $pad, 0);
          display: block;
          transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1) 0.4s;
        }

        &:after {
          position: absolute;
          content: '';
          bottom: -$thick;
          left: $extra;
          right: $extra;
          height: $thick;
          background: $color;
          // z-index: -1;
          transition: transform 0.8s cubic-bezier(1, 0, 0.37, 1) 0.2s,
            right 0.2s cubic-bezier(0.04, 0.48, 0, 1) 0.6s, left 0.4s cubic-bezier(0.04, 0.48, 0, 1) 0.6s;
          transform-origin: left;
        }
      }

      .line {
        position: absolute;
        background: $color;

        &.-right,
        &.-left {
          width: $thick;
          bottom: -$thick;
          top: -$thick;
          transform: scale3d(1, 0, 1);
        }

        &.-top,
        &.-bottom {
          height: $thick;
          left: -$thick;
          right: -$thick;
          transform: scale3d(0, 1, 1);
        }

        &.-right {
          right: -$thick;
          transition: transform 0.1s cubic-bezier(1, 0, 0.65, 1.01) 0.23s;
          transform-origin: top;
        }

        &.-top {
          top: -$thick;
          transition: transform 0.08s linear 0.43s;
          transform-origin: left;
        }

        &.-left {
          left: -$thick;
          transition: transform 0.08s linear 0.51s;
          transform-origin: bottom;
        }

        &.-bottom {
          bottom: -$thick;
          transition: transform 0.3s cubic-bezier(1, 0, 0.65, 1.01);
          transform-origin: right;
        }
      }

      a:hover,
      a:active {
        .text {
          transform: translate3d(0, 0, 0);
          transition: transform 0.6s cubic-bezier(0.2, 0, 0, 1) 0.4s;
        }

        &:after {
          transform: scale3d(0, 1, 1);
          right: -$thick;
          left: -$thick;
          transform-origin: right;
          transition: transform 0.2s cubic-bezier(1, 0, 0.65, 1.01) 0.17s,
            right 0.2s cubic-bezier(1, 0, 0.65, 1.01), left 0s 0.3s;
        }

        .line {
          transform: scale3d(1, 1, 1);

          &.-right {
            transition: transform 0.1s cubic-bezier(1, 0, 0.65, 1.01) 0.2s;
            transform-origin: bottom;
          }

          &.-top {
            transition: transform 0.08s linear 0.4s;
            transform-origin: right;
          }

          &.-left {
            transition: transform 0.08s linear 0.48s;
            transform-origin: top;
          }

          &.-bottom {
            transition: transform 0.5s cubic-bezier(0, 0.53, 0.29, 1) 0.56s;
            transform-origin: left;
          }
        }
      }
    `,
  ],
})
export class DropDownComponent {
  @Input() text: string = '';
  @Input() routerText: string = '';
}
