import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Header } from './components/header/header';
import { AuthGuard } from './_guard/auth-guard';
import { Menu } from './components/menu/menu';
import { Prestador } from './components/prestador/prestador';
import { Home } from './components/home/home';
import { Pais } from './components/cadastro/pais/pais';
import { Uf } from './components/cadastro/uf/uf';
import { Cidades } from './components/cadastro/cidades/cidades';
import { ParametrosRotas } from './components/cadastro/parametros-rotas/parametros-rotas';

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
        path: 'cadastroPaises',
        component: Menu,
        canActivate: [AuthGuard],
        children: [
            {
                path: '', 
                component: Pais
            },
        ],
    },
    {
        path: 'parametrosRotas/:id',
        component: Menu,
        canActivate: [AuthGuard],
        children: [
            {
                path: '', 
                component: ParametrosRotas
            },
        ],
    },
    {
        path: 'cadastroUF',
        component: Menu,
        canActivate: [AuthGuard],
        children: [
            {
                path: '', 
                component: Uf
            },
        ],
    },
    {
        path: 'cadastroCidade',
        component: Menu,
        canActivate: [AuthGuard],
        children: [
            {
                path: '', 
                component: Cidades
            },
        ],
    }
];
