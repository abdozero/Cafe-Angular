import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  DB_URL = "http://localhost:3000/users";

  isPasswordCorrect = false;
  editUserByIdResponce: any;
  constructor(public myHttp: HttpClient) { }
  GetUserByName(name:string, password:string){
    let id = name.toLowerCase().trim().replace(/[\s\t]+/g, "-")
    return this.myHttp.get(this.DB_URL+"/"+id);
  }

  GetUserById(id: string){
    return this.myHttp.get(this.DB_URL+"/"+id);
  }

  verifyPassword(id: string, password: string | null): Observable<boolean> {
    return this.myHttp.get<any>(this.DB_URL + "/" +id).pipe(
      map(user => user.password === password)
    );
  }

  EditUserById(id:string, password:string | null, update: any): Observable<any> {
    return this.verifyPassword(id, password).pipe(
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
