import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
//import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appointService: AppointmentService
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  
  onSubmit() {
    if (this.loginForm.valid){
      this.appointService.authenticate(this.loginForm.value).subscribe({
        next: (response) => console.warn("Login successfuly ", response),
        error: (error) => console.warn("Login error ", error)
      });
    }
  }
}
