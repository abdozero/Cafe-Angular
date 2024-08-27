import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { User } from '../../model/user.model';
import { CommonVariablesService } from '../../Services/common-variables.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  // cartItems: Product[] = [];
  userid: string | null = null;
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
  constructor(
    private cartService: CartService,
    private userService: UserService,
    public commonVariables: CommonVariablesService
  ) {}

  ngOnInit(): void {
    // // this.cartService.cart$.subscribe((items) => {
    //   this.cartItems = items;
    // });
    this.commonVariables.user$.subscribe((user: User) => {
      this.user = user;
      delete this.user.password;
    });
  }
}
