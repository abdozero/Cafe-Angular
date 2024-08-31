import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../model/product.model'; // Adjust path accordingly
import { CartService } from '../../Services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../model/user.model';
import { CommonVariablesService } from '../../Services/common-variables.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  searchTerm: string = '';
  Products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string = '';
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
    private cartService: CartService,

    public commonVariables: CommonVariablesService,
    public prodserve: ProductService,

    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commonVariables.user$.subscribe((user: User) => {
      this.user = user;
      delete this.user.password;
    });
    this.prodserve.getProducts().subscribe({
      next: (data: Product[]) => {
        this.Products = data;
        this.route.queryParams.subscribe((params) => {
          this.category = params['category'] || '';
          this.filterProducts();
        });
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  filterProducts() {
    let filtered = this.Products;

    // Filter by category
    if (this.category) {
      filtered = filtered.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === this.category.toLowerCase()
      );
    }

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title &&
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredProducts = filtered;
  }

  addToCart(product: Product) {
    // this.cartService.addToCart(product);
    this.user.cart.push(product);
    this.cartService.updatecart(this.user.id, { cart: this.user.cart });
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
  detail(id: string) {
    this.router.navigate(['/detail/'+id]);
  }
}
