import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AnimatedCustomizableTextComponent } from 'shared/ui/animated-customizable-text';
import { DropDownComponent } from 'shared/ui/link-button';
import { FadeInOrderTextComponent } from 'shared/ui/fade-in-order-text';

@Component({
  selector: 'main-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fullscreen">
      <div class="text-container">
        <fade-in-order-text
          [text]="
            'Your one-stop destination for all things tech! Discover the latest smartphones, trendy accessories, high-quality headphones, and more. With a user-friendly interface, competitive prices, and secure transactions, we make online shopping a breeze. Stay connected and shop with confidence at Mobila, your ultimate tech haven.'
          "
        ></fade-in-order-text>
      </div>
      <div class="button-container">
        <link-button [text]="'start now'" [routerText]="'shop'"></link-button>
      </div>
    </div>
  `,
  styles: [
    `
      .fullscreen {
        min-height: 100vh;
        width: 100vw;

        display: flex;
        justify-content: center;
        place-items: center;
        flex-direction: column;
      }

      .text-container {
        width: 80vw;
        margin-bottom: 5rem;
      }

      .button-container {
      }
    `,
  ],
  imports: [
    AnimatedCustomizableTextComponent,
    RouterLink,
    AnimatedCustomizableTextComponent,
    DropDownComponent,
    FadeInOrderTextComponent,
    FadeInOrderTextComponent,
    FadeInOrderTextComponent,
  ],
})
export class MainPageComponent {}
