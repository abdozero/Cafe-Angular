import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from "./Component/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './Services/user.service';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService){}
  title = 'Restaurant';
  BrandName: string = "Brand Name";
  user: User = {
    id: "",
    userType: "",
    profilePicture: "",
    userName: "",
    email: "",
    gender: "",
    address: "",
    orders: []
  }
  ngOnInit(){
    this.userService.sendUser$.subscribe((user: User)=>{
      this.user = user;
      delete this.user.password;
    });
  }
}
