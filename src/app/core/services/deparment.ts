import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { DepartmentRes } from '../interfaces/deparmentInterface';

@Service()
export class Deparment {
    http = inject(HttpClient)

    getAllParentDepartments():Observable<DepartmentRes> {
        return this.http.get<DepartmentRes>( environment.API_URL + 'GetParentDepartment')
    }
    getAllChildDeparments(id: number):Observable<DepartmentRes> {
        return this.http.get<DepartmentRes>( environment.API_URL + 'GetChildDepartmentByParentId?deptId=' + id)
    }
}
