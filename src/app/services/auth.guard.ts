import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { UserRole } from "./userRole.service";

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
        // if (token){
        //     return true;
        // } else{
        //     this.router.navigate(['/login']);
        //     return false;
        // }

        // Force expectedRoles to be an array even if undefined.
        const expectedRoles: UserRole[] = route.data['expectedRoles'] ?? [];
        console.log("Expected roles:", expectedRoles);

        
        const userRole = this.authService.getUserRole();
        console.log("Current user role:", userRole);

        // If route data contains no roles, do we really want to grant free access?
        // If yes, returning here means any code after is unreachable.
        if (expectedRoles.length === 0) {
        return true;
        }

        // // If expectedRoles has any roles defined and the user's role is not among them, block access.
        // if (expectedRoles.length > 0 && !expectedRoles.includes(userRole as UserRole)) {
        //     console.warn(`Access denied: user role "${userRole}" is not permitted for ${state.url}.`);
        //     this.router.navigate(['/appointments']);
        //     return false;
        // }

        // !expected roles, block access
        if (!expectedRoles.includes(userRole as UserRole)) {
        this.router.navigate(['/appointments']);
        return false;
        }

        //role is permitted
        return true;
        
    }

}