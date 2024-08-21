// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service'; // Import the AuthService
// import { Router } from '@angular/router'; // Import Router for navigation

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'] // Corrected to styleUrls (plural)
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   loginError: boolean = false;

//   constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]]
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const { email, password } = this.loginForm.value;

//       this.authService.login(email, password).subscribe(
//         success => {
//           if (success) {
//             this.router.navigate(['/home']); // Navigate to home on success
//           } else {
//             this.loginError = true;
//           }
//         },
//         error => {
//           console.error('Login error', error);
//           this.loginError = true;
//         }
//       );
//     }
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() myEvent = new EventEmitter();
  Fire(){
  }
}

