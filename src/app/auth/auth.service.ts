import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token:string;
  private isAuth=false;

  constructor(private http: HttpClient) { }

  getToken(){
    return this.token;
  }

  getAuthStatus(){
    return this.isAuth;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post("http://localhost:3000/api/user/signup", authData).subscribe(
      response => {
        console.log(response);
      })
  }

  login(email:string,password:string){
    const authData: AuthData = { email: email, password: password };
    this.http.post<{token:string}>("http://localhost:3000/api/user/login", authData).subscribe(
      response =>{
        const token=response.token;
        this.token=token;
        if(token){
          this.isAuth=true;
        }
      }
    )
  }

  logout(){
    this.isAuth=false;
    this.token=null;
  }
}
