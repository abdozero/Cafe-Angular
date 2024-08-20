import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  DB_URL = "http://localhost:3000/users";
  private loggedIn = false;
  private userType = "none";

  constructor(public myHttp: HttpClient) { }

  CheckUserExist(id: string): Observable<boolean>{
    return this.myHttp.get(this.DB_URL+"/"+id).pipe(
      map(() => true),
      catchError(error => {
        if (error.status === 404) {
          return of(false);
        }
        else {return throwError(() => error);}
      })
    );
  }

  AddUser(user: User){
    return this.myHttp.post(this.DB_URL, user);
  }

  VerifyPassword(id: string, password: string | null): Observable<boolean> {
    return this.myHttp.get<any>(this.DB_URL + "/" +id).pipe(
      map(user => user.password === password)
    );
  }

  Login(name:string, password:string){
    const id = "user-" + name.toLowerCase().trim().replace(/[\s\t]+/g, "-");
    return this.GetUserById(id, password);
  }

  Signout(){
    this.loggedIn = false;
    this.userType = "none";
  }

  IsAuthenticated(){
    return this.loggedIn;
  }

  get UserType(){return this.userType;}

  GetUserById(id: string, password:string){
    return this.VerifyPassword(id, password).pipe(
      switchMap(isVerified => {
        if (isVerified)
        {

          const user = this.myHttp.get(this.DB_URL+"/"+id);
          user.subscribe(user=> this.userType = (user as User).userType);
          this.loggedIn = true;
          return user;
        }
        else
        {
          return of({ error: 'Password verification failed' });
        }
      }),
      catchError(err => {
        console.error('Error occurred:', err);
        return of({ error: 'An error occurred' });
      })
    );
  }

  EditUserById(id:string, password:string | null, update: any): Observable<any> {
    return this.VerifyPassword(id, password).pipe(
      switchMap(isVerified => {
        if (isVerified)
        {
          return this.myHttp.patch(this.DB_URL + "/" + id, update);
        }
        else
        {
          return of({ error: 'Password verification failed' });
        }
      })
    );
  }
}
