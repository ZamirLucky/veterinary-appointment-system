import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './app/interceptors/loggin.interceptor';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(
      withInterceptors([loggingInterceptor])
    )
  ]
}).catch((err) => console.error(err));

// bootstrapApplication(AppointmentListComponent, appConfig)
//   .catch((err) => console.error(err));
