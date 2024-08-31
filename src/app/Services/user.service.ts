import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { CommonVariablesService } from './common-variables.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  DB_URL = 'http://localhost:3002/users';
  private loggedIn = false;
  private userType = 'none';
  private currentUsernameSubject = new BehaviorSubject<string | null>(null);
  currentUsername$ = this.currentUsernameSubject.asObservable();
  constructor(
    private myHttp: HttpClient,
    private commonVariables: CommonVariablesService
  ) {}

  GetAllUsers():Observable<User[]>{
    return this.myHttp.get<User[]>(this.DB_URL);
  }

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
    return this.GetUserByIdWithPassword(id, password);
  }

  Signout() {
    this.loggedIn = false;
    this.userType = 'none';
    this.currentUsernameSubject.next(null);
  }

  IsAuthenticated() {
    return this.loggedIn;
  }

  get UserType() {
    return this.userType;
  }

  private sendUser = new BehaviorSubject<User>({
    id: '',
    userType: 'none',
    profilePicture: '',
    userName: '',
    email: '',
    gender: '',
    address: '',
    cart: [],
  });
  sendUser$ = this.sendUser.asObservable();
  GetUserByIdWithPassword(
    id: string,
    password: string | null
  ): Observable<User | { error: string; password?: string | null }> {
    return this.VerifyPassword(id, password).pipe(
      switchMap((isVerified) => {
        if (isVerified) {
          const user = this.GetUserById(id);
          user.subscribe((user: User) => {
            this.userType = user.userType;
            this.sendUser.next(user);
            this.currentUsernameSubject.next(user.id);
            this.commonVariables.setUser(user);
          });
          this.loggedIn = true;
          return user;
        } else {
          return of({ error: 'Wrong username or password', password: '' });
        }
      }),
      catchError((err) => {
        console.error('Error occurred:', err);
        return of({ error: 'An error occurred', password: '' });
      })
    );
  }

  GetUserById(id: string){
    return this.myHttp.get<User>(this.DB_URL + '/' + id);
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

  DeleteUserById(id: string, password: string | null): Observable<any> {
    return this.VerifyPassword(id, password).pipe(
      switchMap((isVerified) => {
        if (isVerified) {
          return this.myHttp.delete(this.DB_URL + '/' + id);
        } else {
          return of({ error: 'Password verification failed' });
        }
      })
    );
  }
}
