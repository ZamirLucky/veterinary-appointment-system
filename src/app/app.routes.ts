import { Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { LoginComponent } from './login/login.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';

export const routes: Routes = [
    {path: "appointments", component: AppointmentListComponent},
    {path: "login", component: LoginComponent},
    {path: "addAppointment", component: AddAppointmentComponent},
    {path: "**", redirectTo: "/appointments", pathMatch: "full"}
];
