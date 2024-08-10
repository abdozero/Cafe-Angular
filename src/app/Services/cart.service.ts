// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product.model'; // Adjust path if needed

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartSubject.next(this.cartItems);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }
}
