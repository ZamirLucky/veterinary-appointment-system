import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRole } from '../services/userRole.service';
import { AuthService } from '../services/auth.service';
import { AppointmentService } from '../services/appointment.service';
import {  Router } from '@angular/router';
import { AddAppointment } from '../dto/addAppointment.dto';

@Component({
  selector: 'app-add-appointment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css',
  providers: [DatePipe]
})
export class AddAppointmentComponent implements OnInit {
  

  addAppointmentForm!: FormGroup;
  currentUserRole: UserRole | '' = '';
  
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private appointmentservice: AppointmentService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void 
  {
    this.addAppointmentForm = this.formBuilder.group({
      patientName: [''],
      animalType: [''],
      ownerIdCardNumber: [''],
      ownerContactNumber: [''],
      ownerName: [''],
      ownerSurname: [''],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
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
    if (this.addAppointmentForm.valid) {
      const formValue = this.addAppointmentForm.value;

      const formattedDate = this.datePipe.transform(formValue.appointmentDate, 'dd/MM/yyyy');
      const appointmentDuration = Number(formValue.appointmentDuration);

      // Construct the payload according to the AddAppointment interface.
      const appointmentPayload: AddAppointment = {
        animalType: formValue.animalType,
        appointmentDate: formattedDate || formValue.appointmentDate,
        appointmentDuration: appointmentDuration,
        appointmentTime: formValue.appointmentTime,  
        ownerContactNumber: formValue.ownerContactNumber, 
        ownerIdCardNumber: formValue.ownerIdCardNumber,
        ownerName: formValue.ownerName,
        ownerSurname: formValue.ownerSurname,
        patientName: formValue.patientName,
        reasonForAppointment: formValue.reasonForAppointment,
        vetNotes: "" 
      };

      this.appointmentservice.addAppointment(appointmentPayload).subscribe({
        next: (response) => {
          console.log('Appointment created successfully:', response);
          this.router.navigate(['/appointments']);
        },
        error: (error) => {
          console.error('Error creating appointment:', error);
        }
      });
    } else {
      console.warn('Form is invalid. Please review your inputs.');
    }
  }

  
}