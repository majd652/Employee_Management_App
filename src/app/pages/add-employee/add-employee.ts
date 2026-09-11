import { Component, inject, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeModel } from '../../core/models/employee.model';
import { EmployeeFormValidationPipe } from '../../core/pipes/employee-form-validation-pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empolyee } from '../../core/services/empolyee';
import { Deparment } from '../../core/services/deparment';
import { childDepartmentDataResponse, DepartmentDataResponse, DepartmentRes } from '../../core/interfaces/deparmentInterface';

@Component({
  imports: [CommonModule, EmployeeFormValidationPipe, ReactiveFormsModule],
  selector: 'app-add-employee',
  styleUrl: './add-employee.css',
  templateUrl: './add-employee.html',
})
export class AddEmployee {
  employeeObj : EmployeeModel = new EmployeeModel()
  empSev = inject(Empolyee)
  depSrv = inject(Deparment)
  deparmentList : WritableSignal<DepartmentDataResponse[]> = signal([]);
  childDepartmentList : WritableSignal<childDepartmentDataResponse[]>  = signal([]);
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      employeeName: ['', [Validators.required, Validators.minLength(3)]],
      contactNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      deptId: [0, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', [Validators.required]],
      role: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(){
    this.getAllDepartments()
  }

  getAllDepartments(){
    this.depSrv.getAllParentDepartments().subscribe({
      next:(res:DepartmentRes) => {
        this.deparmentList.set(res.data)
      },
      error:(err:any) => {
        console.log(err)
      }
    })
  }

  onChangeParent($event : any){
    const id = $event.target.value;

    this.depSrv.getAllChildDeparments(id).subscribe({
      next:(res:DepartmentRes) => {
        this.childDepartmentList.set(res.data)
      },
      error:(err:any) => {
        console.log(err)
      }
    })
  }

  onCreateEmployee() {
    if(this.employeeForm.valid){
      this.employeeObj = this.employeeForm.value;
      this.empSev.crateEmployee(this.employeeObj).subscribe({
        next:(res:EmployeeModel)=> {
          alert('Employee created successfully');
          this.employeeForm.reset();
        },
        error:(err:any)=> {
          console.log(err)
        }
      })
    }
    else{
      this.markFormGroupTouched(this.employeeForm);
      alert('Please fill all the required fields')
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get employeeName() { return this.employeeForm.get('employeeName'); }
  get contactNo() { return this.employeeForm.get('contactNo'); }
  get emailId() { return this.employeeForm.get('emailId'); }
  get deptId() { return this.employeeForm.get('deptId'); }
  get password() { return this.employeeForm.get('password'); }
  get gender() { return this.employeeForm.get('gender'); }
  get role() { return this.employeeForm.get('role'); }
}
