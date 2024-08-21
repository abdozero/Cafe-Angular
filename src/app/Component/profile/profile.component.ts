import { Component } from '@angular/core';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [EditProfileComponent, OrdersHistoryComponent, AppComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

}
