import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { CommonVariablesService } from './common-variables.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  DB_URL = 'http://localhost:3002/users';
  private loggedIn = false;
  private userType = 'none';

  constructor(private myHttp: HttpClient, private commonVariables: CommonVariablesService) {}

  CheckUserExist(id: string): Observable<boolean> {
    return this.myHttp.get(this.DB_URL + '/' + id).pipe(
      map(() => true),
      catchError((error) => {
        if (error.status === 404) {
          return of(false);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  AddUser(user: User) {
    return this.myHttp.post(this.DB_URL, user);
  }

  VerifyPassword(id: string, password: string | null): Observable<boolean> {
    return this.myHttp
      .get<any>(this.DB_URL + '/' + id)
      .pipe(map((user) => user.password === password));
  }

  Login(name: string | null, password: string | null) {
    const id =
      'user-' +
      name
        ?.toLowerCase()
        .trim()
        .replace(/[\s\t]+/g, '-');
    return this.GetUserById(id, password);
  }

  Signout() {
    this.loggedIn = false;
    this.userType = 'none';
  }

  IsAuthenticated() {
    return this.loggedIn;
  }

  get UserType() {
    return this.userType;
  }

  GetUserById(
    id: string,
    password: string | null
  ): Observable<User | { error: string; password?: string | null }> {
    return this.VerifyPassword(id, password).pipe(
      switchMap((isVerified) => {
        if (isVerified) {
          const user = this.myHttp.get<User>(this.DB_URL + '/' + id);
          user.subscribe((user: User) => {
            this.userType = user.userType;
            this.commonVariables.setUser(user);
          });
          this.loggedIn = true;
          return user;
        } else {
          return of({ error: 'Password verification failed', password: '' });
        }
      }),
      catchError((err) => {
        console.error('Error occurred:', err);
        return of({ error: 'An error occurred', password: '' });
      })
    );
  }

  EditUserById(
    id: string,
    password: string | null,
    update: any
  ): Observable<any> {
    return this.VerifyPassword(id, password).pipe(
      switchMap((isVerified) => {
        if (isVerified) {
          return this.myHttp.patch(this.DB_URL + '/' + id, update);
        } else {
          return of({ error: 'Password verification failed' });
        }
      })
    );
  }
}
