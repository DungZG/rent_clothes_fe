import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzDividerModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        agreeTerms: [false, [Validators.requiredTrue]],
      },
      { validators: passwordMatchValidator }
    );
  }

  get passwordStrength(): { level: number; label: string; color: string } {
    const password = this.registerForm.get('password')?.value || '';
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, label: 'Yếu', color: '#f5222d' };
    if (score === 2) return { level: 2, label: 'Trung bình', color: '#faad14' };
    if (score === 3) return { level: 3, label: 'Tốt', color: '#52c41a' };
    return { level: 4, label: 'Mạnh', color: '#1890ff' };
  }

  get passwordStrengthWidth(): string {
    return `${(this.passwordStrength.level / 4) * 100}%`;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      console.log('Register:', this.registerForm.value);
      // TODO: integrate auth service
    } else {
      Object.values(this.registerForm.controls).forEach((ctrl) => {
        ctrl.markAsDirty();
        ctrl.updateValueAndValidity({ onlySelf: true });
      });
    }
  }

  registerWithGoogle(): void {
    console.log('Register with Google');
  }

  registerWithFacebook(): void {
    console.log('Register with Facebook');
  }
}
