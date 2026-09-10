import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Service()
export class Empolyee {
    http = inject(HttpClient)

    crateEmployee(emp: EmployeeModel):Observable<EmployeeModel> {
        return this.http.post<EmployeeModel>(environment.API_URL + 'CreateEmployee ', emp)
    }
}
