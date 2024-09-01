import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderrService {
  DB_URL = 'http://localhost:3002/users';
  private orderItems: Product[] = [];
  private orderSubject = new BehaviorSubject<Product[]>([]);
  constructor(private myHttp: HttpClient) {}
  cart$ = this.orderSubject.asObservable();

  // addToCart(product: Product) {
  //   this.cartItems.push(product);
  //   this.cartSubject.next(this.cartItems);
  // }

  getCartItems(): Product[] {
    return this.orderItems;
  }
  updateorder(id: string, update: { order: any[] }): Observable<any> {
    return this.myHttp.patch(this.DB_URL + '/' + id, update);
  }

  MakeOrder(order: Order) {
    return this.myHttp.post(this.DB_URL, order);
  }
}
