export class EmployeeModel {
    employeeName: string;
    contactNo: string;
    emailId: string;
    deptId: number;
    password: string;
    gender: string;
    role: string;
    createdDate: Date;
    
    constructor(){
    this.employeeName = '';
    this.contactNo = '';
    this.emailId = '';
    this.deptId = 0;
    this.password = '';
    this.gender = '';
    this.role = '';
    this.createdDate = new Date();
}
}

