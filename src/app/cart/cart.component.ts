import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

import { FormBuilder } from '@angular/forms';
import { first, Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any;
  itemPrices: number[] = [];
  totalPrice!: number;
  taxes!: number;
  shippingCost!: number;
  cartItems$!: Observable<number>;

  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  constructor(
    private cartService: CartService, 
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.count$;
    this.items = this.cartService.getItems();
    this.getTotalPrice();
  }

  getSalesTaxes(tax: number) {
    this.taxes = tax;
  }

  getShippingCost(cost: number) {
    this.shippingCost = cost;
  }

  getTotalPrice() {
    this.items.map((item: any) => {
      if (item.total === 0) {
        this.itemPrices.push(item.unitPrice);
      } else if (item.total > 0) {
        this.itemPrices.push(item.total);
      }
    })
    this.totalPrice = this.itemPrices.reduce((a, b) => {
      return a + b;
    }, 0);
  }
  
  getCountValue(callback: any) {
    this.cartItems$
      .pipe(
        first()
      ).subscribe(callback)
  }

  onIncrease(item: any) {
    this.cartService.increaseCount(item);
    this.getCountValue((countVal: any) => {
      this.cartService.setCount(++countVal);
    });
    this.itemPrices = [];
    this.getTotalPrice();
  }

  onDecrease(item: any) {
    this.cartService.decreaseCount(item);
    this.getCountValue((countVal: any) => {
      this.cartService.setCount(--countVal);
    });
    this.itemPrices = [];
    this.getTotalPrice();
  }
  
  onRemove(item: any) {
    this.cartService.removeItem(item.id);
    if (this.items == 1) {
      this.items = [];
      this.getCountValue(() => {
        this.cartService.setCount(0);
      })
    } else {
      let productCount = item.quantity;
      this.getCountValue((countVal: any) => {
        this.cartService.setCount(countVal - productCount);
      });
      item.unitPrice = item.unitPrice;
      item.total = 0;
      item.quantity = 1
      this.items = this.cartService.items;
      this.itemPrices = [];
      this.getTotalPrice();
    }
  }

  onSubmit(): void {
    this.items = this.cartService.getItems();
    this.cartService.resetQuantity();
    this.cartService.clearCart();
    console.warn('Your oder has been submitted.', this.checkoutForm.value);
    this.checkoutForm.reset();
    this.getCountValue(() => {
      this.cartService.setCount(0);
    })
    this.route.navigate(['/']);
  }

}
