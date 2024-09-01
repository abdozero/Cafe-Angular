import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { CommonVariablesService } from '../../Services/common-variables.service';
import { User } from '../../model/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [ProductService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  product: Product | any;

  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private commonVariables: CommonVariablesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productService.getprodid(id).subscribe((product) => {
        this.product = product;
      });
    });

    this.commonVariables.user$.subscribe((user) => {
      this.user = user;
    });
  }

  addToCart(product: Product): void {
    if (this.user) {
      this.user.cart.push(product);
      this.cartService.updatecart(this.user.id, { cart: this.user.cart });
    } else {
      console.warn('User not logged in');
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
