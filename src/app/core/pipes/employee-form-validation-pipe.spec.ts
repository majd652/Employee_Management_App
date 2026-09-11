import { EmployeeFormValidationPipe } from './employee-form-validation-pipe';

describe('EmployeeFormValidationPipe', () => {
  it('create an instance', () => {
    const pipe = new EmployeeFormValidationPipe();
    expect(pipe).toBeTruthy();
  });
});
