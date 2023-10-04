import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string ="http://localhost:3000/"
  private showToolbar: boolean = true ;

  setShowToolbar(show : boolean): void {
    this.showToolbar =show;
  }
    
  getShowToolbar(): boolean{
    return this.showToolbar;
  }

  constructor(private http : HttpClient, private router:Router) { }
  // checkCredentials(email: string, password: string): Observable<any>
  //  {
  //   const url = `${this.baseUrl}/Register?email=${email}&password=${password}`;
  //   return this.http.get(url);
  //  }

  signUp(userObj:any): Observable<any>{
    return this.http.post<any>("http://localhost:3000/Register",userObj)
  }

  login(loginObj:any):Observable<any>{
    console.log("gg", loginObj)
    return this.http.post<any>("http://localhost:3000/User",loginObj)

}
}

