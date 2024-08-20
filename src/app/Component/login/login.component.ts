import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UserService, private http: HttpClientModule){}
  username = "";
  password = "";
  login(){
    this.userService.Login(this.username, this.password).subscribe(error=>console.log(error));
  }
}
