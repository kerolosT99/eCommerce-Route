import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, AbstractControl } from '@angular/forms';
import { registerData } from '../../../shared/interfaces/account-data';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { FailAuthResponse, SuccessAuthResponse } from '../../../shared/interfaces/authentication-reponse';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMsg!: string;
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.confirmPasswordValidator })
  emailExample: string = 'Kerolos@gmail.com'
  registeredAccount!: registerData
  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) {
  }

  confirmPasswordValidator(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    }
    else {
      g.get('rePassword')?.setErrors({ mismatch: true })
      return { mismatch: true }
    }
  }
  submitRegister() {
    this.isLoading = true
    if (this.registerForm.valid) {

      this._AuthenticationService.signUpAccount(this.registerForm.value).subscribe(
        {
          next: (res: SuccessAuthResponse | FailAuthResponse) => {
            this.isLoading = false
            console.log(res);
            this._Router.navigate(['/login'])
          },
          error: (err) => {
            this.isLoading = false
            console.log(err);
            this.errorMsg = err.error.message

          }
        }
      )

    }

  }

}
