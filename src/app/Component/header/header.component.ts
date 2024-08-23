import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../model/user.model';
import { CommonVariablesService } from '../../Services/common-variables.service';

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
    cart: [],
  };
  BrandName: string = '';

  constructor(
    private userService: UserService,
    private commonVariables: CommonVariablesService,
    private myHttp: HttpClientModule
  ) {}

  ngOnInit() {
    this.userService.sendUser$.subscribe((user: User) => {
      this.user = user;
      delete this.user.password;
    });

    this.commonVariables.brandName$.subscribe((brandName: string)=> {
      this.BrandName = brandName;
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
      cart: [],
    };
    this.userService.Signout();
  }
}
