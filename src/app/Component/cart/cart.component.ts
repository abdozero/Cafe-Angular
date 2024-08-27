import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  userid: string | null = null;
  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
    this.userService.currentUsername$.subscribe((username) => {
      this.userid = username;
      console.log(this.userid);
      // Use the userid as needed
    });
  }
}
