import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'running-text',
  template: `
    <div class="running-text" #runningText)>
      <p class="text text-1">
        <span *ngFor="let i of [].constructor(count)" [style.font-size.rem]="fontSize">{{
          text
        }}</span>
      </p>
      <p class="text text-2">
        <span *ngFor="let i of [].constructor(count)" [style.font-size.rem]="fontSize">{{
          text
        }}</span>
      </p>
    </div>
  `,
  styles: [``],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf],
})
export class RunningTextComponent {
  @Input() isLeft: boolean = true;
  @Input() animationDuration: number = 20;
  @Input() fontSize: number = 1;
  @Input() text: string = 'check';
  @Input() count: number = 10;
}
