import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * A custom cross-field validator that ensures the chosen date and time are not in the past.
*/
export function futureDateTimeValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const dateValue = group.get('appointmentDate')?.value;
      const timeValue = group.get('appointmentTime')?.value;
  
      // fields are missing, !validate yet.
      if (!dateValue || !timeValue) {
        return null;
      }
  
      const chosenDate = new Date(dateValue); 
  
      // Parse the time from "HH:mm" (24-hour format).
      // AM/PM parser.
      let [hours, minutes] = timeValue.split(':');
      const hoursNum = parseInt(hours, 10);
      const minutesNum = parseInt(minutes, 10);
  
      // Set the hours and minutes on the date.
      chosenDate.setHours(hoursNum, minutesNum, 0, 0);
      const now = new Date();
  
      // Compare chosenDate and current date/time.
      if (chosenDate < now) {
        return { pastDateTime: true };
      }
  
      return null;
  
    }
  
}
