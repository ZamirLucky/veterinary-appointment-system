import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class AlertService{

    /**
   * Displays a warning alert with a customizable message.
   * @param message The warning message to display.
   */
    showWarning(ms: string): void{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: ms,
        });
    }
    
    /**
     * Displays a success alert with a customizable message.
     * @param message The success message to display.
    */
    showSuccess(ms: string): void{
        Swal.fire({
            title: "Success!",
            text: ms,
            icon: "success"
        });
    }
}