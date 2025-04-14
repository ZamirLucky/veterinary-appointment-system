import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../dto/appointment.dto';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit{

  constructor(
    private appointmentService: AppointmentService, 
    private authService: AuthService
  ){}

  currentUserRole: string | null = '';
  appointments: Appointment[] = []

  ngOnInit(): void {
    this.currentUserRole = this.authService.getUserRole();
    this.initialiseAppointments();
  }

  initialiseAppointments(){
    this.appointmentService.getAppointments().subscribe((response: Appointment[]) => {
      this.appointments = response;
    });
  }

  
  deleteAppointment(appointmentId: number): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to delete the appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.deleteAppointment(appointmentId).subscribe({
          next: () => {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "The appointment has been deleted.",
              icon: "success"
            });
            //this.appointments = this.appointments.filter(appt => appt.appointmentId !== appointmentId);
            this.initialiseAppointments(); 
          },
          error: (error) => {
            swalWithBootstrapButtons.fire({
              title: "Error!",
              text: "There was an error deleting the appointment.",
              icon: "error"
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "The appointment was not deleted.",
          icon: "error"
        });
      }
    });
  }

}
