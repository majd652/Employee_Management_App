import { Component, inject } from '@angular/core';
import { EmployeeModel } from '../../core/models/employee.model';
import { Observable } from 'rxjs';
import { Employee } from '../../core/services/employee';
import { AsyncPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [AsyncPipe, RouterLink],
  selector: 'app-employees',
  styleUrl: './employees.css',
  templateUrl: './employees.html',
})
export class Employees {
  empSrv = inject(Employee)
  employeesList : Observable<EmployeeModel[]> = new Observable<EmployeeModel[]>();
  router = inject(Router);
  private destroyRef = inject(DestroyRef);
  constructor(){
    this.employeesList = this.empSrv.getAllEmployees();
  }
  
  addEmployee(){
    this.empSrv.getAllEmployees().pipe(
     takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
    this.router.navigateByUrl('/Admin/add-employee');
  }
}
