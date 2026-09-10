import { Component, inject, WritableSignal, signal } from '@angular/core';
import { EmployeeModel } from '../../core/models/employee.model';
import { FormsModule } from '@angular/forms';
import { Empolyee } from '../../core/services/empolyee';
import { Deparment } from '../../core/services/deparment';
import { childDepartmentDataResponse, DepartmentDataResponse, DepartmentRes } from '../../core/interfaces/deparmentInterface';


@Component({
  imports: [FormsModule],
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
    this.empSev.crateEmployee(this.employeeObj).subscribe({ 
      next:(res:EmployeeModel)=> {
        alert('Employee created successfully')
      },
      error:(err:any)=> {
        console.log(err)
      }
    })
  }
}
