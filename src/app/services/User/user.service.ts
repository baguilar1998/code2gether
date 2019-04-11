import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '../../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User; // holds the user data throughout the entire website
  private token: string;
  private tokenTimer: any;
  private authenticated = false;
  constructor(private http: HttpClient,
  private router: Router) { }

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

  getUser(): User {
    return this.user;
  }
  /**
   * Sets the user data to use for the entire website
   * @param currentUser the user information
   */
  setUser(currentUser: User): void {
    this.user = currentUser;
  }

  setToken(data): void {
    this.token = data.token;
    if (data.token) {
      const expiresInDuration = data.expiresIn;
      this.setAuthTimer(expiresInDuration);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      this.saveAuthData(data.token, expirationDate);
      localStorage.setItem('user',JSON.stringify(this.user));
      this.authenticated = true;
      this.router.navigate(['/projects']);
    }
  }

  /**
   * Method that auto authenticates the user
   * (Keeps the user logged in as long as they haven't logged out)
   */
  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0 || expiresIn != null) {
      this.user = authInformation.user;
      this.token = authInformation.token;
      this.authenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      // this.authStatusListener.next(true);
      this.router.navigate(['/projects']);
    }
  }
   /**
   * Logs the user out of the main page
   */
  logout () {
    this.token = null;
    this.authenticated = false;
    // this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

    /**
   * A helper function that sets the Node.js timer
   * @param duration the current time
   */
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      // this.logout();
    }, duration * 1000);
  }

   /**
   * A helper method to keep the user logged in if they haven't log
   * out of their account or if the token hasn't expired using local
   * storage
   * @param token the current user that's logged in
   * @param expirationDate the duration of the token
   */
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('date', expirationDate.toISOString());
  }

  private getAuthData() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('date');
    if (!token || !expirationDate) {
      return;
    }
    return {token: token, expirationDate: new Date(expirationDate), user: user};
  }

    /**
   * Clears any auth data from the local storage
   */
  private clearAuthData() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('date');
  }


}
