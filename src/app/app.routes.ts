import { Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { LoginComponent } from './login/login.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AuthGuard } from './services/auth.guard';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';


export const routes: Routes = [
    {path: "appointments", 
        component: AppointmentListComponent, 
        canActivate: [AuthGuard]
    },
    {path: "login", component: LoginComponent},
    {path: "addAppointment", 
        component: AddAppointmentComponent, 
        canActivate: [AuthGuard],
        data: { expectedRoles: ['RECEPTIONIST', 'ADMIN'] }
    },
    { path: 'update-appointment/:id', 
        component: UpdateAppointmentComponent 
    },
    {path: "**", 
        redirectTo: "/appointments",
        pathMatch: "full"
    }
];
