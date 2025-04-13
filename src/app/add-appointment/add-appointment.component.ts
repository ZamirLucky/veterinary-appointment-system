import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserRole } from '../services/userRole.service';
import { AuthService } from '../services/auth.service';
import { AppointmentService } from '../services/appointment.service';
import {  Router } from '@angular/router';
import { AddAppointment } from '../dto/addAppointment.dto';
import { AlertService } from '../services/alert.service';

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
    private datePipe: DatePipe,
    private alertService: AlertService
  ) {}

  ngOnInit(): void 
  {
    this.addAppointmentForm = this.formBuilder.group({
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

  // Getters to access in template
  get ownerIdCardNumber() {
    return this.addAppointmentForm.get('ownerIdCardNumber');
  }
  get ownerName() {
    return this.addAppointmentForm.get('ownerName');
  }
  get ownerSurname() {
    return this.addAppointmentForm.get('ownerSurname');
  }
  get ownerContactNumber() {
    return this.addAppointmentForm.get('ownerContactNumber');
  }
  get patientName() {
    return this.addAppointmentForm.get('patientName');
  }
  get animalType() {
    return this.addAppointmentForm.get('animalType');
  }
  get appointmentDate() {
    return this.addAppointmentForm.get('appointmentDate');
  }
  get appointmentTime() {
    return this.addAppointmentForm.get('appointmentTime');
  }
  get appointmentDuration() {
    return this.addAppointmentForm.get('appointmentDuration');
  }
  get reasonForAppointment() {
    return this.addAppointmentForm.get('reasonForAppointment');
  }

  /**
   *
   * This method checks if the form is valid and then performs the required actions
   * such as sending the form data to a service.
  */
  onSubmit(): void {
    if (this.addAppointmentForm.valid) {

      this.addAppointmentForm.markAllAsTouched();
      const formValue = this.addAppointmentForm.value;

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
      this.addAppointmentForm.markAllAsTouched();

    }
  }

}


/**
 * A custom cross-field validator that ensures the chosen date and time are not in the past.
*/
export function futureDateTimeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const dateValue = group.get('appointmentDate')?.value;
    const timeValue = group.get('appointmentTime')?.value;

    // fields are missing, !validate yet.
    if (!dateValue || !timeValue) {
      return null;
    }

    const chosenDate = new Date(dateValue); 

    // Parse the time from "HH:mm" (24-hour format).
    // AM/PM parser.
    let [hours, minutes] = timeValue.split(':');
    const hoursNum = parseInt(hours, 10);
    const minutesNum = parseInt(minutes, 10);

    // Set the hours and minutes on the date.
    chosenDate.setHours(hoursNum, minutesNum, 0, 0);
    const now = new Date();

    // Compare chosenDate and current date/time.
    if (chosenDate < now) {
      return { pastDateTime: true };
    }

    return null;

  }

}