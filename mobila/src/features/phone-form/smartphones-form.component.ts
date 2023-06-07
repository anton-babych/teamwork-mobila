import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { CategoryType, Headphones, Phone } from 'entities/products/api';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};

@Component({
  selector: 'smartphones-form[item]',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="form" [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-input" *ngFor="let field of formFields">
        <label>{{ field.name }}</label>
        <input [type]="field.type" [formControlName]="field.name" />
      </div>
      <div class="form-buttons">
        <button [disabled]="form.invalid" class="form-buttons__btn" type="submit">Submit</button>
        <button class="form-buttons__btn" type="reset">Reset</button>
      </div>
    </form>
  `,
  styles: [
    `
      label {
        color: black;
      }
      .form {
        display: flex;
        flex-direction: column;
        &-input {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }

        &-buttons {
          width: 100%;
          display: flex;
          &__btn {
            flex-grow: 1;
          }
        }
      }
    `,
  ],
})
export class SmartphoneFormComponent implements OnInit {
  @Input() item!: CategoryType;
  @Output() isSubmitted = new EventEmitter<Phone>();

  form: FormGroup;
  formFields: { name: string; type: 'number' | 'text'; value: string | number }[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.form = new FormGroup<ControlsOf<Phone>>({
      id: new FormControl(this.item.id, { nonNullable: true }),
      description: new FormControl(this.item.description, { nonNullable: true }),
      imagePath: new FormControl(this.item.imagePath, { nonNullable: true }),
      model: new FormControl(this.item.model, { nonNullable: true }),
      firm: new FormControl(this.item.firm, { nonNullable: true }),
      price: new FormControl(this.item.price, { nonNullable: true }),
    });

    this.formFields = [
      { name: 'id', type: 'text', value: this.form.value.id },
      { name: 'imagePath', type: 'text', value: this.form.value.imagePath },
      { name: 'description', type: 'text', value: this.form.value.description },
      { name: 'price', type: 'number', value: this.form.value.price },
      { name: 'firm', type: 'text', value: this.form.value.firm },
      { name: 'model', type: 'text', value: this.form.value.model },
    ];

    this.generateFormFields();
  }

  generateFormFields() {
    for (let field of this.formFields) {
      this.form.addControl(field.name, this.formBuilder.control(field.value, Validators.required));
    }
  }

  onSubmit() {
    this.isSubmitted.emit(this.form.value as Phone);
  }
}
