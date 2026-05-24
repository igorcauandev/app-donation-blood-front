import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { PainelComponent } from './painel-controle/painel-controle';
import { DoadoresComponent } from './doadores-component/doadores-component';
import { EstoqueComponent } from './estoque-component/estoque-component';
import { DoacoesComponent } from './doacoes-component/doacoes-component';
import { CampanhasComponent } from './campanhas-component/campanhas-component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'painel', component: PainelComponent, canActivate: [authGuard]},
    {path: 'doadores', component: DoadoresComponent, canActivate: [authGuard]},
    {path: 'estoque', component: EstoqueComponent, canActivate: [authGuard]},
    {path: 'doacoes', component: DoacoesComponent, canActivate: [authGuard]},
    {path: 'campanhas', component: CampanhasComponent, canActivate: [authGuard]},
];
