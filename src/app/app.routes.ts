import { Routes } from '@angular/router';
import { guardGuard } from './core/guards/guard-guard';

export const routes: Routes = [
    {
        path:"", redirectTo:"login", pathMatch:"full"
    },
    {path:"login",loadComponent :()=> import('./pages/login/login').then(m => m.Login)},
    {path:"Admin",canActivate:[guardGuard],loadComponent :()=> import('./layout/layout/layout').then(m => m.Layout),
        children:[
            {path:"dashboard",canActivate:[guardGuard],loadComponent :()=> import('./pages/dashboard/dashboard').then(m => m.Dashboard)},
            {path:"employees",canActivate:[guardGuard],loadComponent:()=> import('./pages/employees/employees').then (m => m.Employees)},
            {path:"add-employee",canActivate:[guardGuard],loadComponent:()=> import('./pages/add-employee/add-employee').then (m => m.AddEmployee)},
            {path:"add-employee/:id",canActivate:[guardGuard],loadComponent:()=> import('./pages/add-employee/add-employee').then (m => m.AddEmployee)}
        ]
    },
];
