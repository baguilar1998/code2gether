import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User; // holds the user data throughout the entire website

  constructor(private http: HttpClient) { }

  /**
   * Signs the user up to the website and stores
   * the user in the database
   * @param userInfo required user information
   */
  signUp(userInfo: User): Observable<any> {
    return this.http.post<any>('//localhost:3000/api/user/signup', userInfo);
  }

  /**
   * Logs the user into the website if they
   * have signed up
   * @param user the username they entered
   * @param pass the password they entered
   */
  login(user: string, pass: string): Observable<any> {
    const requiredInformation = {
      username: user,
      password: pass
    };
    return this.http.post<any>('//localhost:3000/api/user/login', requiredInformation);
  }

  /**
   * Sets the user data to use for the entire website
   * @param currentUser the user information
   */
  setUser(currentUser: User): void {
    this.user = currentUser;
  }
}
