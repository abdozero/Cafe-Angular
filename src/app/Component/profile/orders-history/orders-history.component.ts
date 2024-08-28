import { Component } from '@angular/core';
import { User } from '../../../model/user.model';
import { CommonVariablesService } from '../../../Services/common-variables.service';
import { OrderService } from '../../../Services/order.service';
import { Order } from '../../../model/order.model';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css'
})
export class OrdersHistoryComponent {
  constructor(
    private commonVariables: CommonVariablesService,
    private ordersService: OrderService ) {}
  status: string[] = ["Pending", "Accepted", "Rejected"];
  orders: any = [];
  user: User = {
    id: '',
    userType: 'none',
    profilePicture: '',
    userName: '',
    email: '',
    gender: '',
    address: '',
    cart: [],
  };
  ngOnInit() {
    this.commonVariables.user$.subscribe(
      (user: User) => {
        this.user = user;
        delete this.user.password;
      }
    );
    this.ordersService.GetOreders(this.user.id).subscribe(
      {
        next: (orders: Order[])=>{
          this.orders = orders;
        }
      }
    )
  }
}
