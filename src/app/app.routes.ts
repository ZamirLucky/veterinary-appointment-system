import { Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { LoginComponent } from './login/login.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';

export const routes: Routes = [
    {path: "viewAppointmentsPage", component: AppointmentListComponent},
    {path: "loginPage", component: LoginComponent},
    {path: "addAppointmentPage", component: AddAppointmentComponent},
    {path: "**", redirectTo: "/viewAppointmentsPage", pathMatch: "full"}
];
