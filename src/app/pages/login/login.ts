import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output() closed = new EventEmitter<void>();
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const dadosLogin: { email: string; password: string } = this.loginForm.value;
      this.errorMessage = '';
      this.authService.login(dadosLogin).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido:', response);
          this.closed.emit();
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.errorMessage = err.message || 'Ocorreu um erro no login.';
        }
      });
  
    } else {
      console.log('Form is invalid');
      this.loginForm.markAllAsTouched();
    }

  }

  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
