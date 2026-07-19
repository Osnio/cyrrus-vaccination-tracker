import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
 loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  phase: 'idle' | 'validating' | 'entering' = 'idle';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.phase = 'validating';

    try {
      await this.authService.login(this.loginForm.value);
      
      this.phase = 'entering';
      await new Promise(r => setTimeout(r, 400));

      this.toastService.show('Bem-vindo(a) de volta!', 'success');
      this.router.navigate(['/dashboard'], { replaceUrl: true });

    } catch (error: any) {
      this.phase = 'idle';
      this.toastService.show(error.message || 'Credenciais inválidas.', 'error');
      this.loginForm.get('password')?.setErrors({ invalid: true });
    } finally {
      this.isLoading = false;
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
