import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-sales-taxes',
  templateUrl: './sales-taxes.component.html',
  styleUrls: ['./sales-taxes.component.css']
})
export class SalesTaxesComponent implements OnInit {
  salesTaxes = this.cartService.getSalesTaxes();
  salesTaxValue = '';
  @Output() stateSalesTax = new EventEmitter();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  onSalesTaxes(tax: number) {
    this.stateSalesTax.emit(tax);
  }

}
