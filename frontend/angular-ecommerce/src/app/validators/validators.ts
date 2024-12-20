import { UntypedFormControl, ValidationErrors } from '@angular/forms';

export class ThisValidators {

  
    static notOnlyWhitespace(control: UntypedFormControl) : ValidationErrors {
        
        if ((control.value != null) && (control.value.trim().length === 0)) {

            return { 'notOnlyWhitespace': true };
        }
        else {
            return null;
        }
    }
}
