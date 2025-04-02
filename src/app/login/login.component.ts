import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  
  onSubmit() {
    console.warn(this.loginForm.value);
  }
}
