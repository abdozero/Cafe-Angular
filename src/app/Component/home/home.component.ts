import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
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
  constructor(public productService: ProductService,
    public router: Router,
    private userService: UserService) { }

  navigateToCategory(category: string) {
    if(this.user.userType === "none"){
      this.router.navigate(['/login']);
    } else {
    this.router.navigate(['/products'], { queryParams: { category } });
  }
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
    this.userService.sendUser$.subscribe((user: User) => {
      this.user = user;
      delete this.user.password;
    });
  }

  addToCart(product: any) {
    // Implement addToCart functionality
    alert(`${product.title} added to cart!`);
  }
}
