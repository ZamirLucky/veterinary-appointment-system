import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Appointment } from '../dto/appointment.dto';
import { AddAppointment } from '../dto/addAppointment.dto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentEndPoint: string = '/api/appointment'
  private authEndPoint: string = '/api/authenticate'

  httpHeader = {
    headers: new HttpHeaders({
        "Content-Type":"application/json"
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(this.appointmentEndPoint);
  }

  addAppointment(appointment: AddAppointment): Observable<AddAppointment> {
    return this.httpClient.post<AddAppointment>(this.appointmentEndPoint, appointment)
    ;
  }

  deleteAppointment(appointmentId: number): Observable<Appointment> {
    const url = `${this.appointmentEndPoint}/${appointmentId}`;
    return this.httpClient.delete<Appointment>(url, this.httpHeader)
      .pipe(catchError((error) => throwError(() => error)));
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.put<Appointment>(this.appointmentEndPoint, appointment, this.httpHeader)
    .pipe(catchError((error) => throwError(() => error)));
  }

  authenticate(credentials: { username: string; password: string }): Observable<any> {
    return this.httpClient.post<any>(this.authEndPoint, credentials);
  }


}
