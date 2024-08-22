import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../model/product.model'; // Adjust path accordingly
import { CartService } from '../../Services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    public prodserve: ProductService,
    public cartService: CartService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.prodserve.getProducts().subscribe({
      next: (data: Product[]) => {
        this.Products = data;
        this.route.queryParams.subscribe(params => {
          this.category = params['category'] || '';
          this.filterProducts();
        });
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  filterProducts() {
    let filtered = this.Products;

    // Filter by category
    if (this.category) {
      filtered = filtered.filter(product =>
        product.category &&
        product.category.toLowerCase() === this.category.toLowerCase()
      );
    }

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(product =>
        product.title &&
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredProducts = filtered;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.title} added to cart!`);
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}
