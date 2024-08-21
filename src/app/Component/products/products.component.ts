import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../model/product.model'; // Adjust path accordingly
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';

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

  constructor(
    public prodserve: ProductService,
    public cartService: CartService,
    public router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.prodserve.getProducts().subscribe({
      next: (data: Product[]) => {
        this.Products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  filteredProducts() {
    if (!this.searchTerm) {
      return this.Products;
    }
    return this.Products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.title} added to cart!`);
  }
  viewCart() {
    this.router.navigate(['/cart']); // Navigate to cart route
  }
}
