import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../../model/user.model';
import { CommonVariablesService } from '../../../Services/common-variables.service';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css'
})
export class OrdersHistoryComponent {
  constructor( private commonVariables: CommonVariablesService, private myHttp: HttpClientModule ) {}
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
    orders: [],
    cart: [],
  };
  ngOnInit() {
    this.commonVariables.user$.subscribe((user: User) => {
      this.user = user;
      delete this.user.password;
    });
  }
}
