import { Injectable } from '@angular/core';

/**
 * AuthService is managing the authentication token.
 * Provides methods to store and retrieve the JWT token from the browser's local storage.
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = 'jwtToken';

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
 * Logs out the user by removing the authentication token from local storage.
 *
 * This method clears the user's session by removing the token stored under the key defined
 * by this.tokenKey. Once the token is removed, the user is effectively logged out.
 */
  logout(): void{
    localStorage.removeItem(this.tokenKey);
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
