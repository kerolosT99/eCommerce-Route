import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let _AuthenticationService = inject(AuthenticationService)
  let _Router = inject(Router)
  if (_AuthenticationService.userData.getValue() != null) {

    return true;
  }
  else
    _Router.navigate(['/login'])
  return false
};
