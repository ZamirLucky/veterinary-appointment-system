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
}
