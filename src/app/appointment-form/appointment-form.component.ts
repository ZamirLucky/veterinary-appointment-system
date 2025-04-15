import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnChanges {

  // Receive the form group from the parent component.
  @Input() appointmentForm!: FormGroup;
  @Input() formSubmitted: boolean = false;
  @Input() currentUserRole: string = '';
  @Input() disableId: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.disableId && this.appointmentForm) {
      this.appointmentForm.get('appointmentId')?.disable();
    }
  }
  // Getters to access in template
  // get appointmentId(){
  //   return this.appointmentForm.get('appointmentId')
  // }
  get ownerIdCardNumber() {
    return this.appointmentForm.get('ownerIdCardNumber');
  }
  get ownerName() {
    return this.appointmentForm.get('ownerName');
  }
  get ownerSurname() {
    return this.appointmentForm.get('ownerSurname');
  }
  get ownerContactNumber() {
    return this.appointmentForm.get('ownerContactNumber');
  }
  get patientName() {
    return this.appointmentForm.get('patientName');
  }
  get animalType() {
    return this.appointmentForm.get('animalType');
  }
  get appointmentDate() {
    return this.appointmentForm.get('appointmentDate');
  }
  get appointmentTime() {
    return this.appointmentForm.get('appointmentTime');
  }
  get appointmentDuration() {
    return this.appointmentForm.get('appointmentDuration');
  }
  get reasonForAppointment() {
    return this.appointmentForm.get('reasonForAppointment');
  }

}


