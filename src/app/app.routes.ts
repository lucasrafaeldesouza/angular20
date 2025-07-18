import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Header } from './components/header/header';
import { AuthGuard } from './_guard/auth-guard';
import { Menu } from './components/menu/menu';
import { Prestador } from './components/prestador/prestador';
import { Home } from './components/home/home';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: 'bemVindo',
        component: Menu,
        canActivate: [AuthGuard],
        children: [
            { 
                path: '', 
                component: Home
            },
        ],
    },
    {
        path: 'consultarPrestadoresP',
        component: Menu,
        canActivate: [AuthGuard],
        children: [
            { 
                path: '', 
                component: Prestador
            },
        ],
    }
];
