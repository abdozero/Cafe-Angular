
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "http://localhost:3000/Products";

  constructor(public http: HttpClient) { }

  getProducts() {
    return this.http.get(this.apiUrl);
  }
}
