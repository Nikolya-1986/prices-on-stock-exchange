import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Provider, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ICustomSelect } from '../../models/interfaces/custom-select-interface';

const CUSTOM_SELECT: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomSelectComponent),
  multi: true,
};

@Component({
  selector: 'custom-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [CUSTOM_SELECT],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() list!: ICustomSelect[];
  @Input() placeholder!: string;
  value = '';
  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  /**
   * called when the original or new value is specified above
   * @param {any} value new value for the element
   */
  writeValue(value: string) {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  /**
   * called when the control's value changes in the UI
   * @param {any} fn callback function to register
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * called to update the form model on blur
   * @param {any} fn callback function to register
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * called when the control status changes
   * @param {boolean} isDisabled current status
   */
  setDisableState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }
}
