import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from "./Component/footer/footer.component";
import { HomeComponent } from './Component/home/home.component';
import { AboutComponent } from "./Component/about/about.component";
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Restaurant';
  BrandName: string = "Brand Name";
}
