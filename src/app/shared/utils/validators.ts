import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static phone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = /^(0[3|5|7|8|9])+([0-9]{8})$/.test(control.value);
      return valid ? null : { phone: true };
    };
  }

  static matchPassword(passwordField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.parent?.get(passwordField)?.value;
      return control.value === password ? null : { mismatch: true };
    };
  }

  static minPrice(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = parseFloat(control.value);
      return !isNaN(value) && value >= min ? null : { minPrice: { min } };
    };
  }
}
