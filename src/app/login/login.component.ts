import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

/**
 * LoginComponent handles user authentication.
 *
 * This standalone component provides a login form that collects the user's username and password
 * using Angular Reactive Forms. It then calls the authentication endpoint via the AppointmentService.
 * On a successful login, the JWT token is stored using AuthService and the user is navigated to the
 * appointments view. If an error occurs during login, an error message is displayed in the template.
*/

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private appointService: AppointmentService,
    private authService: AuthService,
    private router: Router
  ){}

  /**
   * Initializes the login form with username and password fields.
  */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  /**
   * Handles the form submission for user login.
   *
   * When the login form is valid, it sends the entered credentials to the authentication API
   * using the AppointmentService. On successful authentication, it stores the received JWT token
   * via AuthService and navigates to the appointments view. If an error occurs during the API call,
   * an error message is set to inform the user.
  */
  onSubmit() {
    if (this.loginForm.valid){
      this.appointService.authenticate(this.loginForm.value).subscribe({
        next: (response) => {
          console.warn("Login successfuly ", response);
          this.authService.setAuthToken(response.jwtToken);
          this.router.navigate(['/appointments']);
        },
        error: (error) => {
          this.errorMessage = "Something went wrong from server";
          console.warn("Login error ", error);   
        }
      });
    }
  }
}
