import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserRole } from '../services/userRole.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-appointment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})
export class AddAppointmentComponent implements OnInit {
  

  appointmentForm!: FormGroup;
  currentUserRole: UserRole | '' = '';
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void 
  {
    this.appointmentForm = this.formBuilder.group({
      patientName: [''],
      animalType: [''],
      ownerIdCardNumber: [''],
      ownerContactNumber: [''],
      ownerName: [''],
      ownerSurname: [''],
      appointmentDate: [''],
      appointmentTime: [''],
      appointmentDuration: [''],
      reasonForAppointment: [''],
      vetNotes: ['']
    });

    this.currentUserRole = this.authService.getUserRole() || '';
  }

  /**
   *
   * This method checks if the form is valid and then performs the required actions
   * (such as sending the form data to a service).
  */
  onSubmit(): void {
    if (this.appointmentForm.valid) {
      console.log('Form submitted:', this.appointmentForm.value);
    }
  }


}
