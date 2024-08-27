import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from './Component/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from './Services/user.service';
import { ProductsComponent } from './Component/products/products.component';
import { DetailsComponent } from './Component/details/details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    DetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private userService: UserService) {}
  title = 'Restaurant';
}
