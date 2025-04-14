import { Injectable } from '@angular/core';
//import { UserRole } from './userRole.service';

/**
 * AuthService is managing the authentication token.
 * Provides methods to store and retrieve the JWT token from the browser's local storage.
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = 'jwtToken';
  private roleKey: string = 'userRole';

  // Save token and role in local storage after login
  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve token from local storage
  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

   // Set role to local storage
   setUserRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  // Retrieve user role from local storage
  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  // check whether user has the desired role
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  
  isReceptionist(): boolean {
    return this.getUserRole() === 'RECEPTIONIST';
  }

  isVet(): boolean {
    return this.getUserRole() === 'VET';
  }

  /**
   * Logs out the user by removing the authentication token and user role from local storage.
   * After calling this method, the user is effectively logged out.
  */
  logout(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  // get from local storage
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

}
