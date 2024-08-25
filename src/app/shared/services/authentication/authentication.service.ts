import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { NewLoginData, loginData, registerData, userEmail } from '../../interfaces/account-data';
import { Environment } from '../../../base/Environment';
import { FailAuthResponse, ForgotPasswordResponse, SuccessAuthResponse } from '../../interfaces/authentication-reponse';
import { jwtDecode } from "jwt-decode";
import { UserData } from '../../interfaces/user-data';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ResetCode } from '../../interfaces/email-code';
import { Token } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  resetEmail!: string
  constructor(private _HttpClient: HttpClient, private _Router: Router, @Inject(PLATFORM_ID) id: object) {

    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('userToken')) {
        this.decodeUserData()
        _Router.navigate([localStorage.getItem('currentPage')])
      }
    }
  }
  signUpAccount(registeredAccount: registerData): Observable<any> {

    return this._HttpClient.post<any>(`${Environment.baseURL}/api/v1/auth/signup`, registeredAccount)
  }

  signInAccount(login: loginData): Observable<any> {
    return this._HttpClient.post<any>(`${Environment.baseURL}/api/v1/auth/signin`, login)
  }

  sendCode(email: userEmail): Observable<ForgotPasswordResponse> {
    return this._HttpClient.post<ForgotPasswordResponse>(`${Environment.baseURL}/api/v1/auth/forgotPasswords`, email)
  }

  passwordCode(code: ResetCode) {
    return this._HttpClient.post<ForgotPasswordResponse>(`${Environment.baseURL}/api/v1/auth/verifyResetCode`, code)
  }

  decodeUserData() {
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decoded = jwtDecode(token)
    this.userData.next(decoded)
    console.log(this.userData.getValue());

  }

  logOut() {
    localStorage.removeItem('userToken')
    this.userData.next(null)
    this._Router.navigate(['/login'])
  }
  resetPassword(newLogin: NewLoginData): Observable<any> {
    return this._HttpClient.put<any>(`${Environment.baseURL}/api/v1/auth/resetPassword`, newLogin)
  }
}

