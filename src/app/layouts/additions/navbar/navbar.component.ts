import { Component, OnInit } from '@angular/core';
import {  RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { CartService } from '../../../shared/services/cart/cart.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false
  constructor(public _AuthenticationService: AuthenticationService, public _CartService: CartService) { }
  ngOnInit(): void {

    this._AuthenticationService.userData.subscribe(() => {
      if (this._AuthenticationService.userData.getValue() != null) {
        this.isLogin = true
        this.cartNumber()
      }
      else {
        this.isLogin = false
      }
    })

  }
  cartNumber() {
    this._CartService.getUserCart().subscribe({
      next: res => {
        this._CartService.cartNumberCounter.next(res.numOfCartItems)
        console.log(this._CartService.cartNumberCounter.getValue());

      }
    })
  }
}
