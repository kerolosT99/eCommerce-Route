import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false
  constructor(public _AuthenticationService: AuthenticationService) { }
  ngOnInit(): void {

    this._AuthenticationService.userData.subscribe(() => {
      if (this._AuthenticationService.userData.getValue() != null) {
        this.isLogin = true
      }
      else {
        this.isLogin = false
      }
    })

  }

}
