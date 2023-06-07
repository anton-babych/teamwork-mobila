import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { SplitIntoCharsPipe } from 'shared/libs';
import { delay } from 'rxjs';

@Component({
  selector: 'fade-in-order-text[text]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, SplitIntoCharsPipe],
  template: `
    <div class="animated-text">
      <span class="animated-text__char" *ngFor="let char of text | splitIntoChars">{{ char }}</span>
    </div>
  `,
  styles: [
    `
      .animated-text {
        &__char {
          font-size: 2rem;
          padding: 0 0.5rem;
          transition: opacity 0.5s;
          opacity: 0;
        }
      }

      .fade-in-animation {
        animation: fadein 1s forwards;
      }

      @keyframes fadein {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class FadeInOrderTextComponent implements AfterViewInit {
  @Input() text!: string;

  charsOrder: string[][] = [
    ['a', 'A'],
    ['b', 'B'],
    ['c', 'C'],
    ['d', 'D'],
    ['e', 'E'],
    ['f', 'F'],
    ['g', 'G'],
    ['h', 'H'],
    ['i', 'I'],
    ['j', 'J'],
    ['k', 'K'],
    ['l', 'L'],
    ['m', 'M'],
    ['n', 'N'],
    ['o', 'O'],
    ['p', 'P'],
    ['q', 'Q'],
    ['r', 'R'],
    ['s', 'S'],
    ['t', 'T'],
    ['u', 'U'],
    ['v', 'V'],
    ['w', 'W'],
    ['x', 'X'],
    ['y', 'Y'],
    ['z', 'Z'],
    ['.', ',', '!', '?'],
  ];

  ngAfterViewInit() {
    this.animateChars().then(() => console.log('complete'));
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async animateChars(): Promise<void> {
    return new Promise<void>((resolve) => {
      const charElements = Array.from(document.querySelectorAll('.animated-text__char'));
      let index = 0;

      const processNextChar = async () => {
        if (index >= this.charsOrder.length) {
          resolve();
          return;
        }

        const char = this.charsOrder[index];

        let containChars: null | string[] = this.isTextContainChars(this.text, char);
        if (containChars) {
          await this.delay(500);

          for (const element of charElements) {
            if (containChars.includes(element.textContent || '')) {
              element.classList.add('fade-in-animation');
            }
          }
        }

        index++;
        processNextChar();
      };

      processNextChar();
    });
  }

  isTextContainChars(text: string, chars: string[]): null | string[] {
    const matchingChars = chars.filter((char) => text.includes(char));
    return matchingChars.length > 0 ? matchingChars : null;
  }

  private fadeInButton() {}
}
