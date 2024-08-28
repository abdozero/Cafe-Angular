import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private Http: HttpClient,
  ) {}

  DB_URL = 'http://localhost:3003/orders';

  GetAllOrders():Observable<Order[]>{
    return this.Http.get<Order[]>(this.DB_URL);
  }

  GetOreders(userId: string): Observable<Order[]>{
    return this.Http.get<Order[]>(this.DB_URL+'?userId='+userId);
  }

  AddOrders(order: Order){
    return this.Http.post(this.DB_URL, order);
  }

  ChangeStatus(id: string, status: string){
    return this.Http.patch(this.DB_URL + '/' + id, {status: status});
  }
}
