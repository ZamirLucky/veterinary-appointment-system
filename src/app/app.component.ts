import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AppointmentListComponent } from "./appointment-list/appointment-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, AppointmentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vetsys-abdirizakosman';
}
