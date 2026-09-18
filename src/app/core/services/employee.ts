import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { globalConstant } from '../globalConstants/tokenConstant';

@Service()
export class Employee {
    http = inject(HttpClient)

    getAllEmployees(): Observable<EmployeeModel[]> {
        return this.http.get<EmployeeModel[]>(environment.API_URL + globalConstant.API_METHOUD.GET_ALL_EMPLOYEE)
    }
    getEmpolyeeById(id: number): Observable<EmployeeModel> {
        return this.http.get<EmployeeModel>(environment.API_URL + globalConstant.API_METHOUD.GET_EMPLOYEE_BY_ID + id)
    }
    crateEmployee(emp: EmployeeModel): Observable<EmployeeModel> {
        return this.http.post<EmployeeModel>(environment.API_URL + globalConstant.API_METHOUD.POST_EMPLOYEE, emp)
    }
    updateEmplyee(id: number, emp: EmployeeModel): Observable<EmployeeModel> {
        return this.http.put<EmployeeModel>(environment.API_URL + globalConstant.API_METHOUD.UPDATE_EMPLOYEE + id, emp)
    }
}