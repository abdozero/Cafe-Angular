import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css'
})
export class OrdersHistoryComponent {
  constructor(){this.fillOrder();}
  orders: any = [];
  fillOrder(){
    for(let i = 1; i < 100; i++)
      this.orders.push(
      {
        id:`${i}`,
        datetime:`order date${i}`,
        products:
        [
          {
            "id": `${i}`,
            "name": `Product${i}`,
            "price": i*10,
            "quantity": i
          },
          {
            "id": `${i+1}`,
            "name": `Product${i+1}`,
            "price": (i+1)*10,
            "quantity": i+1
          }
        ],
        total: i*i*10 + (i+1)*(i+1)*10,
      })
  }
}
