import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userType = "none";
  userName = "";
  @Input() BrandName: string = "";


  constructor(private UService: UserService, private myHttp: HttpClientModule){}

  signout(){
    this.userType = "none";
    this.UService.Signout();
  }
}
