import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private userService: UserService, private http: HttpClientModule){}
  loginForm= new FormGroup({
    username:new FormControl(""),
    password: new FormControl("")
  })
  errorMessage: string | null = null;
  login(){
    this.userService.Login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)

    .subscribe({
      next: (response) => {
        console.log('Login successful', response);
      },
      error: (error) => {
        this.errorMessage = error;
      }
    })

}
}

