// // orderr.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Order } from '../model/order.model';
// import { Product } from '../model/product.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class OrderrService {
//   DB_URL = 'http://localhost:3002/users'; // Ensure this is correct

//   constructor(private http: HttpClient) {}

//   // Update user's orders
//   updateorder(id: string, update: { order: Order[] }): Observable<any> {
//     return this.http.patch(`${this.DB_URL}/${id}`, update);
//   }

//   // Create a new order (if needed)
//   MakeOrder(order: Order): Observable<any> {
//     return this.http.post(`${this.DB_URL}/${order.userId}/orders`, order); // Adjust URL as needed
//   }
// }
// orderr.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderrService {
  private DB_URL = 'http://localhost:3003/orders'; // URL to your orders endpoint

  constructor(private myHttp: HttpClient) {}

  // Method to create a new order
  createOrder(order: Order): Observable<Order> {
    return this.myHttp.post<Order>(this.DB_URL, order);
  }
  updateorder(id: string, update: { order: Order[] }): Observable<any> {
    return this.myHttp.patch(`${this.DB_URL}/${id}`, update);
  }
}
// Update user's orders
