import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonVariablesService {

  constructor() { }
  private brandName = new BehaviorSubject<string>("Café Delight");
  brandName$ = this.brandName.asObservable();
}
