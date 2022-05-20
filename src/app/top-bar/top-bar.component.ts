import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable, Observer } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  hideMatBadge: boolean | undefined;
  cartItems$!: Observable<number>;
  items: any;

  constructor(
    private cartService: CartService,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.count$;
    this.cartItems$.subscribe(count => {
      this.items = count;
      if (this.items === 0) {
        this.hideMatBadge = true;
      } else {
        this.hideMatBadge = false;
      }
    });
  }

  onHome() {
    this.routes.navigate(['/']);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/