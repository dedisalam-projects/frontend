import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {
  AuthService,
  User,
  ProfileResponse,
  UpdateProfileDto,
} from '@dedisalam/shared/data-access';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzDescriptionsModule,
    NzSpinModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private message = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);

  user: User | null = null;
  isLoading = true;
  isSaving = false;
  isEditing = false;

  profileForm = this.fb.group({
    name: ['', [Validators.required]],
    password: [''],
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.authService.getProfile().subscribe({
      next: (res: ProfileResponse) => {
        this.user = res.data || null;
        this.profileForm.patchValue({
          name: this.user?.name,
        });
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message.error(err.error?.message || 'Failed to load profile');
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.user) {
      this.profileForm.patchValue({
        name: this.user.name,
        password: '',
      });
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      const data: UpdateProfileDto = { name: this.profileForm.value.name || undefined };
      if (this.profileForm.value.password) {
        data.password = this.profileForm.value.password;
      }

      this.authService.updateProfile(data).subscribe({
        next: (res: ProfileResponse) => {
          this.user = res.data || null;
          this.message.success('Profile updated successfully!');
          this.isSaving = false;
          this.isEditing = false;
          this.profileForm.patchValue({ password: '' });
        },
        error: (err) => {
          this.message.error(err.error?.message || 'Failed to update profile');
          this.isSaving = false;
        },
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
