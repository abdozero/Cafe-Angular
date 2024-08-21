import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'; // Import RouterOutlet for routing
import { LoginComponent } from './Component/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    LoginComponent,
  RouterModule], // Import LoginComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Restaurant'; // Title for the application

  // Property to store data from LoginComponent
  loginDataFromChild: string = '';

  // Method to handle event emitted by LoginComponent
  handleLoginData(data: string) {
    console.log("Data received from LoginComponent:", data);
    this.loginDataFromChild = data; // Update the property with received data
  }
}
