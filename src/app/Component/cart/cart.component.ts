import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.model';
import { CommonVariablesService } from '../../Services/common-variables.service';
import { Order } from '../../model/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../model/product.model';
import { OrderrService } from '../../Services/orderr.service';
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
    private orderrservice: OrderrService,
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
  addorder(product: Product) {
    // this.cartService.addToCart(product);
    this.user.order.push(product);
    this.orderrservice.updateorder(this.user.id, { order: this.user.order });
  }
  deletefromcart(product: Product) {
    // Find the index of the product to remove
    const productIndex = this.user.cart.findIndex((p) => p.id === product.id);

    // If the product is found in the cart
    if (productIndex !== -1) {
      // Remove the product from the cart array
      this.user.cart.splice(productIndex, 1);

      // Update the cart in the backend
      this.cartService.updatecart(this.user.id, { cart: this.user.cart });
    } else {
      console.warn('Product not found in cart');
    }
  }
  vieworders() {
    this.router.navigate(['/orderr']);
  }
}
