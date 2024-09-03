import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {
  payment: string[] = ['Cash', 'Visa']
  constructor(private _OrderService: OrderService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
  shippingAddressForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required]),
  })
  paymentControl: FormControl = new FormControl(this.payment[0], [Validators.required])
  submitVisaOrder() {
    if (this.shippingAddressForm.valid) {
      this._ActivatedRoute.params.subscribe({
        next: params => {
          this._OrderService.visaCheckOut(params['cartID'], this.shippingAddressForm.value).subscribe({
            next: res => {
              console.log(res);
              window.open(res.session.url, '_self')
              localStorage.setItem('currentPage', 'allorders')
            },
            error: err => {
              console.log(err);
            }
          })
        }
      })

    }
  }
  submitCashOrder() {
    if (this.shippingAddressForm.valid) {
      this._ActivatedRoute.params.subscribe({
        next: params => {
          this._OrderService.cashCheckOut(params['cartID'], this.shippingAddressForm.value).subscribe({
            next: res => {
              console.log(res);
              localStorage.setItem('currentPage', 'allorders')
              this._Router.navigate(['/allorders'])
            },
            error: err => {
              console.log(err);
            }
          })
        }
      })

    }
  }
  submitOrder() {
    if (this.paymentControl.value == 'Visa') {
      this.submitVisaOrder()
    }
    else {
      this.submitCashOrder()
    }
  }
}
