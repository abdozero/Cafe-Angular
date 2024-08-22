import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: User = {
    id: '',
    userType: 'none',
    profilePicture: '',
    userName: '',
    email: '',
    gender: '',
    address: '',
    orders: [],
    carts: [],
  };
  @Input() BrandName: string = '';

  constructor(
    private userService: UserService,
    private myHttp: HttpClientModule
  ) {}

  ngOnInit() {
    this.userService.sendUser$.subscribe((user: User) => {
      this.user = user;
      delete this.user.password;
    });
  }

  signout() {
    this.user = {
      id: '',
      userType: 'none',
      profilePicture: '',
      userName: '',
      email: '',
      gender: '',
      address: '',
      orders: [],
      carts: [],
    };
    this.userService.Signout();
  }
}
