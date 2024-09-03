
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { OrdersRes } from '../../../shared/interfaces/orders';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})

export class AllOrdersComponent implements OnInit {
  isLoading: boolean = false
  userID!: any
  userOrders !: OrdersRes[]
  constructor(private _OrderService: OrderService, private _AuthenticationService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.userID = this._AuthenticationService.userData.getValue().id
    console.log(this.userID);
    this.getUserOrders()
  }
  getUserOrders() {
    this.isLoading = true
    this._OrderService.getAllOrders(this.userID).subscribe({
      next: (res) => {
        this.isLoading = false
        this.userOrders = res
        console.log(res);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
