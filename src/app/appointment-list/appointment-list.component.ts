import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../dto/appointment.dto';

@Component({
  selector: 'app-appointment-list',
  imports: [],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit{

  constructor(private appointmentService: AppointmentService){}


  appointments: Appointment[] = []

  ngOnInit(): void {
    this.initialiseAppointments();
  }

  initialiseAppointments(){
    this.appointmentService.getAppointments().subscribe((response: Appointment[]) => {
      this.appointments = response;
    });
  }


}
