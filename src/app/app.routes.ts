import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { AuthGuard } from './_guard/auth-guard';
import { Menu } from './components/menu/menu';

export const routes: Routes = [
    {
        path: "",
        component: Login
    },
    {
        path: '',
        component: Menu,
        children: [
            { 
                path: 'home', 
                component: Home,
                canActivate: [AuthGuard]
            },
        ],
    },
];
