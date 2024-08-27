import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private http: HttpClientModule,
    private router: Router
  ) {}
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  login() {
    this.userService
      .Login(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value
      )
      .subscribe({
        next: (result) => {
          if("error" in result){
            console.log('Login error: ', result);
          }
          else if(result.userType === "user"){
            this.router.navigate(['/profile'])
          }
          else if(result.userType === "admin"){
            this.router.navigate(['/home'])
          }
        }
      }
    );
  }
}
