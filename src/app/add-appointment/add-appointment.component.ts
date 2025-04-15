import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AppointmentService } from '../services/appointment.service';
import {  Router } from '@angular/router';
import { AddAppointment } from '../dto/addAppointment.dto';
import { AlertService } from '../services/alert.service';
import { AppointmentFormComponent } from "../appointment-form/appointment-form.component";
import { futureDateTimeValidator } from '../update-appointment/update-appointment.component';

@Component({
  selector: 'app-add-appointment',
  imports: [CommonModule, ReactiveFormsModule, AppointmentFormComponent],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css',
  providers: [DatePipe]
})
export class AddAppointmentComponent implements OnInit {

  appointmentForm!: FormGroup;
  currentUserRole: string = '';
  formSubmitted: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private appointmentservice: AppointmentService,
    private router: Router,
    private datePipe: DatePipe,
    private alertService: AlertService
  ) {}

  ngOnInit(): void 
  {
    this.appointmentForm = this.formBuilder.group({
      patientName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      animalType: ['', Validators.required],
      ownerIdCardNumber: ['', [Validators.required, Validators.pattern(/^\d+[A-Za-z]$/)]],
      ownerContactNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      ownerName: ['',
        [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(20), 
          Validators.pattern('^[A-Za-z]+$')
        ]
      ],
      ownerSurname: ['', 
        [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(20), 
          Validators.pattern('^[A-Za-z]+$')
        ]
      ],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      appointmentDuration: ['', Validators.required],
      reasonForAppointment: ['', Validators.required],
      vetNotes: ['']
    },{
      validators: [futureDateTimeValidator()]   // cross-field validator
    });

    this.currentUserRole = this.authService.getUserRole() || '';
  }

  /**
   *
   * This method checks if the form is valid and then performs the required actions
   * such as sending the form data to a service.
  */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.appointmentForm.valid) {

  
      const formValue = this.appointmentForm.value;

      const formattedDate = this.datePipe.transform(formValue.appointmentDate, 'dd/MM/yyyy');
      const appointmentDuration = Number(formValue.appointmentDuration);

      // Construct the payload to the AddAppointment interface.
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
          this.alertService.showSuccess('Appointment has been added successfully!');
          this.router.navigate(['/appointments']);
        },
        error: (error) => {
          console.error('Error creating appointment:', error);
          this.alertService.showWarning('Something went wrong!');
        }
      });
    } else {
      this.appointmentForm.markAllAsTouched();

    }
  }

}