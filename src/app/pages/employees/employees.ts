import { Component, inject } from '@angular/core';
import { EmployeeModel } from '../../core/models/employee.model';
import { map, Observable } from 'rxjs';
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
  employeesList: Observable<EmployeeModel[]> = new Observable<EmployeeModel[]>();
  router = inject(Router);
  private destroyRef = inject(DestroyRef);
  searchTerm: string = '';
  constructor() {
    this.employeesList = this.empSrv.getAllEmployees();
  }

  addEmployee() {
    this.empSrv.getAllEmployees().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
    this.router.navigateByUrl('/Admin/add-employee');
  }
  onDeleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empSrv.deleteEployee(id).subscribe({
        next: (res) => {
          alert('Employee is successfully deleted');
          this.employeesList = this.empSrv.getAllEmployees();
        },
        error: (err: any) => {
          console.error('Delete error:', err);
          alert((err.error?.message) + '\n' + " the request reached the point the backend could not process it ");
        }
      })
    }
  }
  onSearch($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.employeesList = this.empSrv.getAllEmployees().pipe(
      map((employees) => {
        if (!this.searchTerm) return employees;
        return employees.filter(emp =>
          emp.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      })
    );
  }
}
