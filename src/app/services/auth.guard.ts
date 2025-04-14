import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";


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
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        const token = this.authService.getAuthToken();
        if (!token) {
            this.router.navigate(['/login']);
            return false;
        }

        // Retrieve the expected roles from the route data as an array of strings.
        const expectedRoles: string[] = route.data['expectedRoles'] ?? [];
        

        // Retrieve the user's role
        const userRole = this.authService.getUserRole();
        console.log("Current user role:", userRole);

        // If route data contains no roles, allow access
        if (expectedRoles.length === 0) {
            return true;
        }

        // if role is not ADMIN and RECEPTIONST block access.
        if (!expectedRoles.includes(userRole || '')) {
            this.router.navigate(['/appointments']);
            return false;
        }

        //role is permitted
        return true;
        
    }

}