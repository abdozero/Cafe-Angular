import { Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ProductsComponent } from './Component/products/products.component';
import { OrdersComponent } from './Component/orders/orders.component';
import { AboutComponent } from './Component/about/about.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { CartComponent } from './Component/cart/cart.component';

export const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"products", component:ProductsComponent},
  {path:"orders", component:OrdersComponent},
  {path:"about", component:AboutComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"profile", component:ProfileComponent},
  {path:"cart", component:CartComponent}
];
