import { Component, inject, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeModel } from '../../core/models/employee.model';
import { EmployeeFormValidationPipe } from '../../core/pipes/employee-form-validation-pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../core/services/employee';
import { Deparment } from '../../core/services/deparment';
import { childDepartmentDataResponse, DepartmentDataResponse, DepartmentRes } from '../../core/interfaces/deparmentInterface';
import { ActivatedRoute } from '@angular/router';
@Component({
  imports: [CommonModule, EmployeeFormValidationPipe, ReactiveFormsModule],
  selector: 'app-add-employee',
  styleUrl: './add-employee.css',
  templateUrl: './add-employee.html',
})
export class AddEmployee {
  employeeObj: EmployeeModel = new EmployeeModel()
  empSev = inject(Employee)
  depSrv = inject(Deparment)
  deparmentList: WritableSignal<DepartmentDataResponse[]> = signal([]);
  childDepartmentList: WritableSignal<childDepartmentDataResponse[]> = signal([]);
  employeeForm: FormGroup;
  empoyeeEidtId: number = 0;
  ActivatedRoute = inject(ActivatedRoute)

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

  ngOnInit() {
    this.getAllDepartments()
    this.ActivatedRoute.params.subscribe({
      next: (res: any) =>
        this.empoyeeEidtId = res.id,
    })
    if (this.empoyeeEidtId != null) {
      this.getEmpolyee()
    }
  }

  getAllDepartments() {
    this.depSrv.getAllParentDepartments().subscribe({
      next: (res: DepartmentRes) => {
        this.deparmentList.set(res.data)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  onChangeParent($event: any) {
    const id = $event.target.value;

    this.depSrv.getAllChildDeparments(id).subscribe({
      next: (res: DepartmentRes) => {
        this.childDepartmentList.set(res.data)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  getEmpolyee() {
    this.empSev.getEmpolyeeById(this.empoyeeEidtId).subscribe({
      next: (res: EmployeeModel) => {
        this.employeeForm.patchValue(res)
      }
    })
  }
  onCreateEmployee() {
    if (this.employeeForm.valid) {
      this.employeeObj = this.employeeForm.value;
      this.empSev.crateEmployee(this.employeeObj).subscribe({
        next: (res: EmployeeModel) => {
          alert('Employee created successfully');
          this.employeeForm.reset();
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
    else {
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
  onUpdateEmployee() {
    if (this.employeeForm.valid) {
      this.employeeObj = {
        ...this.employeeForm.value,
        employeeId: this.empoyeeEidtId,  
        createdDate: this.employeeObj.createdDate || new Date()
      };
      this.empSev.updateEmplyee(this.empoyeeEidtId, this.employeeObj).subscribe({
        next: (res: EmployeeModel) => {
          alert("Employee updated successfully")
          this.employeeForm.reset();
        },
        error: (err: any) => {
          alert('Employee update failed unknown error');
          console.log(err)
        }
      })
    } else {
      this.markFormGroupTouched(this.employeeForm);
      alert('Please fill all the required fields')
    }
  }

  get f() {
    return this.employeeForm.controls;
  }
}
