export interface DepartmentRes {

    message: string
    result: boolean
    data: any

}
export interface DepartmentDataResponse {
    departmentId: number,
    departmentName: string,
    departmentLogo: string
}
export interface childDepartmentDataResponse {
    childDeptId: 0,
    parentDeptId: 0,
    departmentName: string
}