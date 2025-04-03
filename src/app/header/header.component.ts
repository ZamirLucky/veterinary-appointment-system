import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router){}

  title: string = "Vet Clinic";

  /**
 * Logs out the user by clearing the session and redirecting to the login page.
 *
 * This method calls the logout function from AuthService to remove the authentication token,
 * then navigates to the '/login' route using the Router.
 */
  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
