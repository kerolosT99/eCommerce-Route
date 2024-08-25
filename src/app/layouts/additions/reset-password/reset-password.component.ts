import { Component } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NewLoginData } from '../../../shared/interfaces/account-data';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  newLogin!: NewLoginData
  isLoading: boolean = false
  errorMsg!: string
  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) { }
  resetPasswordForm: FormGroup = new FormGroup({
    'newPassword': new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)])
  })
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true
      this.newLogin = {
        email: this._AuthenticationService.resetEmail,
        newPassword: this.resetPasswordForm.get('newPassword')?.value
      }

      this._AuthenticationService.resetPassword(this.newLogin).subscribe({
        next: res => {
          this.isLoading = false
          localStorage.setItem('userToken', res.token)
          this._AuthenticationService.decodeUserData()
          this._Router.navigate(['home'])
        },
        error: err => {
          this.isLoading = false
          console.log(err);
          this.errorMsg = err.error.message
        }
      })

    }
  }
}
