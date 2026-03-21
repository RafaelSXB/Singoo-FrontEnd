import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  @Output() closed = new EventEmitter<void>();
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.errorMessage = '';
      this.authService.register({ email, password }).subscribe({
        next: (response) => {
          console.log('Registro bem-sucedido:', response);
          this.router.navigate(['/catalog']);
        },
        error: (err) => {
          console.error('Erro no registro:', err);
          this.errorMessage = err.message || 'Ocorreu um erro no registro.';
        }
      });
    } else {
      console.log('Form is invalid');
      this.registerForm.markAllAsTouched();
    }

  }

  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
