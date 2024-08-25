import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { FailAuthResponse, SuccessAuthResponse } from '../../../shared/interfaces/authentication-reponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading: boolean = false;
  errorMsg !: string

  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) {

  }
  loginForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),
  })


  submitLogin() {
    this.isLoading = true
    this._AuthenticationService.signInAccount(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        console.log(res);
        localStorage.setItem('userToken', res.token)
        this._AuthenticationService.decodeUserData()
        this._Router.navigate(['/home'])
      },
      error: (err) => {
        this.isLoading = false
        console.log(err);
        this.errorMsg = err.error.message
      }
    })

  }
}
