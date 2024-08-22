import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Products: any[] = [];
  categories = [
    { name: 'Drinks', pic: 'Products/cafelatte.PNG' },
    { name: 'Breakfast', pic: 'Products/1.jpeg' },
    { name: 'Lunch', pic: 'Products/chicken.PNG' },
    { name: 'Dinner', pic: 'Products/meatproduct.PNG' }
  ];

  constructor(public productService: ProductService, public router: Router) { }

  navigateToCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { category } });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.Products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  addToCart(product: any) {
    // Implement addToCart functionality
    alert(`${product.title} added to cart!`);
  }
}
