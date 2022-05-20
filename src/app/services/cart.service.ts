import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  count$: Observable<number> = this.count.asObservable();
  items: Product[] = [];
  updatedItems: Product[] = [];

  constructor(private http: HttpClient) { }

  setCount(countVal: number) {
    this.count.next(countVal);
  }

  addToCart(product: Product) {
    this.items.push(product);
  }
 
  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('assets/shipping.json');
  }

  getSalesTaxes() {
    return this.http.get<{state: string, tax: number}[]>('assets/taxes.json');
  }

  getItems() {
    return this.items;
  }

  removeItem(id: any) {
    if (this.items.length === 1) {
      this.items = [];
    }
    this.items.filter(item => {
      if (item.id !== id) {
        this.updatedItems.push(item);
      }
    });
    this.clearCart();
    this.items = this.updatedItems;
    this.updatedItems = [];
  }
  
  increaseCount(itemInfo: any) {
    this.items.map(item => {
      if (item.id === itemInfo.id) {
        item.quantity++;
        item.total =  item.unitPrice * item.quantity;
      }
    });
  }

  decreaseCount(itemInfo: any) {
    this.items.map(item => {
      if (item.id === itemInfo.id) {
        item.quantity--;
        item.total =  item.total - item.unitPrice;
        if (item.quantity < 1) {
          item.quantity = 1;
          item.total = 0;
          item.unitPrice = item.unitPrice;
        }
      }
    });
  }

  resetQuantity() {
    this.items.map((item: any) => {
      item.unitPrice = item.unitPrice;
      item.total = 0;
      item.quantity = 1;
    });
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}