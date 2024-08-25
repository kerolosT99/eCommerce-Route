import { Component } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-email-code',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './email-code.component.html',
  styleUrl: './email-code.component.scss'
})
export class EmailCodeComponent {
  isLoading: boolean = false
  errorMsg!: string
  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) { }
  emailCode: FormGroup = new FormGroup({
    'resetCode': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)])
  })
  resetCode() {
    if (this.emailCode.valid) {
      this.isLoading = true
      this._AuthenticationService.passwordCode(this.emailCode.value).subscribe({
        next: (res) => {
          this.isLoading = false
          console.log(res);
          console.log(this._AuthenticationService.resetEmail);
          this._Router.navigate(['/reset-password'])
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
