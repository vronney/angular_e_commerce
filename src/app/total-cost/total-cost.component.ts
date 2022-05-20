import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-total-cost',
  templateUrl: './total-cost.component.html',
  styleUrls: ['./total-cost.component.css']
})
export class TotalCostComponent implements OnInit {
  @Input() item: any;
  @Input() shippingCost!: number;
  @Input() taxes!: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.shippingCost = 25.99;
  }
}

