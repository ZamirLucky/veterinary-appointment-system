import { Injectable } from '@angular/core';
import { UserRole } from './userRole.service';

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

  /**
   * Stores the authentication token in local storage.
   *
   * The method called after a successful login to persist the JWT token.
   *
   * @param token - The JWT token received from the authentication endpoint.
  */
  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Retrieves the stored authentication token from local storage.
   *
   * @returns The JWT token if it exists, otherwise null.
  */
  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Stores the user role in local storage.
   * This should be set after login along with the JWT token.
   *
   * @param role - The user's role, e.g., RECEPTIONIST, VET, or ADMIN.
  */
  setUserRole(role: UserRole): void {
    console.log("(AuthService) Setting user role to:", role); // Add debug logging
    localStorage.setItem(this.roleKey, role);
  }

  /**
   * Retrieves the stored user role from local storage.
   *
   * @returns The user's role if it exists, otherwise null.
  */
  getUserRole(): UserRole | null {
    return localStorage.getItem(this.roleKey) as UserRole | null;
  }

  /**
   * Checks whether the user has the Admin role.
   *
   * @returns True if the user's role is ADMIN, false otherwise.
  */
  isAdmin(): boolean {
    return this.getUserRole() === UserRole.ADMIN;
  }

  /**
   * Checks whether the user has the Receptionist role.
   *
   * @returns True if the user's role is RECEPTIONIST, false otherwise.
   */
  isReceptionist(): boolean {
    return this.getUserRole() === UserRole.RECEPTIONIST;
  }

  /**
   * Checks whether the user has the Vet role.
   *
   * @returns True if the user's role is VET, false otherwise.
  */
  isVet(): boolean {
    return this.getUserRole() === UserRole.VET;
  }

 /**
   * Logs out the user by removing the authentication token and user role from local storage.
   * After calling this method, the user is effectively logged out.
  */
  logout(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  /**
 * Checks if the user is currently logged in.
 *
 * This method returns a boolean value indicating whether an authentication token exists
 * in local storage. If a token is found (i.e., the user is logged in), it returns true;
 * otherwise, it returns false.
 *
 * @returns A boolean value representing the user's authentication status.
 */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

}
