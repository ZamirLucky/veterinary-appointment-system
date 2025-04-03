import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../dto/appointment.dto';

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

  authenticate(credentials: { username: string; password: string }): Observable<any> {
    return this.httpClient.post<any>(this.authEndPoint, credentials);
  }
}
