import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { CanActivate, Router} from "@angular/router";

/**
 * AuthGuard is a route guard that prevents unauthorized users from accessing certain routes.
 *
 * It checks whether a valid authentication token exists using AuthService.
 * If a token is present, the route can be activated; otherwise, the user is redirected to the login page.
*/

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router) {}

    /**
     * Determines whether a route can be activated.
     *
     * This method checks for the presence of an authentication token using AuthService.
     * - If a token exists, it returns true, allowing access to the route.
     * - If no token is found, it redirects the user to the login page and returns false.
     *
     * @returns A boolean indicating whether the route can be activated.
    */
    canActivate(): boolean{
        const token = this.authService.getAuthToken();
        if (token){
            return true;
        } else{
            this.router.navigate(['/login']);
            return false;
        }
    }

}