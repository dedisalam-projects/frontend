import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AuthService, RegisterDto } from '@dedisalam/shared/data-access';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private message = inject(NzMessageService);

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  isLoading = false;

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const data: RegisterDto = {
        name: this.registerForm.value.name || undefined,
        email: this.registerForm.value.email || undefined,
        password: this.registerForm.value.password || undefined,
      };
      this.authService.register(data).subscribe({
        next: () => {
          this.isLoading = false;
          this.message.success('Registration successful! Please login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.message.error(err.error?.message || 'Registration failed!');
        },
      });
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
