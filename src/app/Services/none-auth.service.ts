import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoneAuthService implements CanActivate {

  constructor(private UService: UserService, private router: Router) { }

  canActivate(): boolean {
    if(!this.UService.IsAuthenticated() && this.UService.UserType == "none") return true;
    this.router.navigate(["/error"]);
    return false;
  }
}
