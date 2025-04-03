import { Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { LoginComponent } from './login/login.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {path: "appointments", component: AppointmentListComponent, canActivate: [AuthGuard]},
    {path: "login", component: LoginComponent},
    {path: "addAppointment", component: AddAppointmentComponent, canActivate: [AuthGuard]},
    {path: "**", redirectTo: "/appointments", pathMatch: "full"}
];
