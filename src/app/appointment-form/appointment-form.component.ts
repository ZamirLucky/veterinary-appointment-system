import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent {

  // Receive the form group from the parent component.
  @Input() appointmentForm!: FormGroup;

}
