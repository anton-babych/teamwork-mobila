import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'drop-down',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  template: ``,
  styles: [``],
})
export class DropDownComponent {
  @Input() data!: { name: string; link: string }[];
}
