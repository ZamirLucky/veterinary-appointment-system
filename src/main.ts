import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//import { AppointmentListComponent } from './app/appointment-list/appointment-list.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// bootstrapApplication(AppointmentListComponent, appConfig)
//   .catch((err) => console.error(err));
