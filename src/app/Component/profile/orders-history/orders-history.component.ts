import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css'
})
export class OrdersHistoryComponent {
  constructor( private userService: UserService, private myHttp: HttpClientModule ) {}
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
    this.userService.sendUser$.subscribe((user: User) => {
      this.user = user;
      delete this.user.password;
    });
  }
}
