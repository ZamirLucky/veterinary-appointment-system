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

    showDelete(): void{

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "do you want delete the appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "No appointment deleted:)",
                icon: "error"
              });
            }
        });
    }
}