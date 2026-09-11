import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationMessage',
  standalone: true,
})
export class EmployeeFormValidationPipe implements PipeTransform {
  transform(errors: ValidationErrors | null | undefined): string {
    if (!errors) return '';
    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Please enter a valid email';
    if (errors['minlength']) return 'Minimum 3 characters required';
    if (errors['pattern']) return 'Please enter a valid format';
    if (errors['min']) return 'Please select a valid option';
    return 'Invalid field';
  }
}
