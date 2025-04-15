import { Component, Injectable, OnInit } from '@angular/core';
import { AppointmentFormComponent } from "../appointment-form/appointment-form.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AppointmentService } from '../services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AlertService } from '../services/alert.service';
import { futureDateTimeValidator} from '../helpers/helper.helpers';
//import { AddAppointment } from '../dto/addAppointment.dto';


@Component({
  providers: [DatePipe],
  selector: 'app-update-appointment',
  standalone: true,
  imports: [AppointmentFormComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './update-appointment.component.html',
  styleUrl: './update-appointment.component.css'
})
export class UpdateAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointmentId!: number;
  currentUserRole: string = '';
  formSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private appointmentservice: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private alertService: AlertService
  ) {}

  ngOnInit(): void 
  {
    this.appointmentForm = this.formBuilder.group({
      appointmentId: ['', [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
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

    this.appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.appointmentservice.getAppointmentById(this.appointmentId).subscribe({
      next: (data) => {
        const parsedDate = parseDateFromString(data.appointmentDate);       
        const formattedDate = this.datePipe.transform(parsedDate, 'yyyy-MM-dd');
        data.appointmentDate = formattedDate ? formattedDate : data.appointmentDate;

        this.appointmentForm.patchValue(data);
        this.appointmentForm.markAsPristine();
        this.appointmentForm.markAsUntouched();
      },
      error: (error) => {
        console.error("Error fetching appointment:", error);
        this.alertService.showWarning('Something went wrong!');
      }
    });

  }


  /**
   * This method checks if the form is valid and then performs the required actions
   * such as sending the form data to a service.
  */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }
  
      // Parse the appointmentDuration and format the appointmentDate
      const formValue = this.appointmentForm.value;
      const formattedDate = this.datePipe.transform(formValue.appointmentDate, 'dd/MM/yyyy');
      formValue.appointmentDate = formattedDate ? formattedDate : formValue.appointmentDate;
      formValue.appointmentDuration = Number(formValue.appointmentDuration);

    this.appointmentservice.updateAppointment(formValue).subscribe({
      next: (response) => {
        console.log("Appointment updated successfully:", response);
        this.alertService.showSuccess('Appointment has been updated successfully!');
        this.router.navigate(['/appointments']);
      },
      error: (error) => {
        console.error('Error creating appointment:', error);
        this.alertService.showWarning('Something went wrong!');
      }
    });
  
  }


}

// parse date
export function parseDateFromString(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}