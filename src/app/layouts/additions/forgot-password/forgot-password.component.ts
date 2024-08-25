import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  isLoading: boolean = false
  errorMsg!: string
  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) { }
  forgotPasswordForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email])
  })
  sendCode() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true
      this._AuthenticationService.sendCode(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          this.isLoading = false
          console.log(res);
          this._Router.navigate(['/email-code'], this.forgotPasswordForm.value)
          this._AuthenticationService.resetEmail = this.forgotPasswordForm.get('email')?.value
        },
        error: (err) => {
          this.isLoading = false
          console.log(err);
          this.errorMsg = err.statusText
        }
      })
    }
  }
}
