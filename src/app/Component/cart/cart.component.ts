import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { User } from '../../model/user.model';
import { CommonVariablesService } from '../../Services/common-variables.service';
import { Order } from '../../model/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [ProductService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  userid: string | null = null;
  Products: Product[] = [];
  user: User = {
    id: '',
    userType: 'none',
    profilePicture: '',
    userName: '',
    email: '',
    gender: '',
    address: '',
    cart: [],
    order: [],
  };
  constructor(
    public commonVariables: CommonVariablesService,
    private cartService: CartService,

    public prodserve: ProductService,

    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commonVariables.user$.subscribe((user: User) => {
      this.user = user;
      delete this.user.password;
    });
  }

  makeorder(order: Order) {
    this.cartService.MakeOrder(order);
  }
  addToCart(product: Product) {
    // this.cartService.addToCart(product);
    this.user.order.push(product);
    this.cartService.updatecart(this.user.id, { cart: this.user.cart });
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}
