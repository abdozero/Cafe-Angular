import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { User } from '../../model/user.model';
import { CommonVariablesService } from '../../Services/common-variables.service';
import { Order } from '../../model/order.model';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  userid: string | null = null;
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
  constructor(
    public commonVariables: CommonVariablesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.commonVariables.user$.subscribe((user: User) => {
      this.user = user;
      delete this.user.password;
    });
  }

  makeorder(order: Order){
    this.cartService.MakeOrder(order);
  }
}
