import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path:"", redirectTo:"login", pathMatch:"full"
    },
    {path:"login",loadComponent :()=> import('./pages/login/login').then(m => m.Login)},
    {path:"Admin",loadComponent :()=> import('./layout/layout/layout').then(m => m.Layout),
        children:[
            {path:"dashboard",loadComponent :()=> import('./pages/dashboard/dashboard').then(m => m.Dashboard)}
        ]
    },
];
