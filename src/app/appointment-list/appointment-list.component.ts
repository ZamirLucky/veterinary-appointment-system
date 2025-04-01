import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../dto/appointment.dto';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
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
