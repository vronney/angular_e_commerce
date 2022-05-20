import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable, Observer } from 'rxjs';
import { Product, products } from '../products';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  cartItems$!: Observable<number>;

  constructor(private route: ActivatedRoute, private cartService: CartService, private routes: Router) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.count$;
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    this.product = products.find(product => product.id === productIdFromRoute);
  }
  
  getCountValue(callback: any) {
    this.cartItems$
      .pipe(
        first()
      ).subscribe(callback)
  }

  addToCart(product: Product) {
    this.getCountValue((countVal: any) => {
      this.cartService.setCount(++countVal)
    });
    this.cartService.addToCart(product);
    this.routes.navigate(['/']);
  }
}
