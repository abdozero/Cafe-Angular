import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

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
    private http: HttpClientModule
  ) {}
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.userService.Login(username, password).subscribe({
      next: (result) => {
        if (result && !(result as any).error) {
          // Login successful
          console.log('Login successful');
        } else {
          // Handle login error
          console.error('Login failed');
        }
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }
}
