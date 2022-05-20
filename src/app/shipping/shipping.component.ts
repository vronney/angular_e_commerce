import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';

import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  shippingCosts = this.cartService.getShippingPrices();
  shippingValue = 'Overnight';
  @Output() shippingCost = new EventEmitter();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    
  }

  onShippingCost(value: any) {
    // this.shippingCost = value;
    this.shippingCost.emit(value);
  }

}
