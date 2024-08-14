import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  DB_URL = "http://localhost:3000/users";

  constructor(public myHttp: HttpClient) { }

  CheckUserExist(id: string): Observable<boolean>{
    return this.myHttp.get(this.DB_URL+"/"+id).pipe(
      map(() => true),
      catchError(error => {
        if (error.status === 404) {
          return of(false);
        }
        else {return throwError(error);}
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

  GetUserByName(name:string, password:string){
    let id = name.toLowerCase().trim().replace(/[\s\t]+/g, "-");
    return this.VerifyPassword(id, password).pipe(
      switchMap(isVerified => {
        if (isVerified)
        {
          return this.myHttp.get(this.DB_URL+"/"+id);
        }
        else
        {
          return of({ error: 'Password verification failed' });
        }
      })
    );
  }

  GetUserById(id: string, password:string){
    return this.VerifyPassword(id, password).pipe(
      switchMap(isVerified => {
        if (isVerified)
        {
          return this.myHttp.get(this.DB_URL+"/"+id);
        }
        else
        {
          return of({ error: 'Password verification failed' });
        }
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
