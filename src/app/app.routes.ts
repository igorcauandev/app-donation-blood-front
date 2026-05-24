import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'painel', loadComponent: () => import('./painel-controle/painel-controle').then(m => m.PainelComponent)},
    {path: 'doadores', loadComponent: () => import('./doadores-component/doadores-component').then(m => m.DoadoresComponent)},
    {path: 'estoque', loadComponent: () => import('./estoque-component/estoque-component').then(m => m.EstoqueComponent)},
    {path: 'doacoes', loadComponent: () => import('./doacoes-component/doacoes-component').then(m => m.DoacoesComponent)},
    {path: 'campanhas', loadComponent: () => import('./campanhas-component/campanhas-component').then(m => m.CampanhasComponent)},
];
