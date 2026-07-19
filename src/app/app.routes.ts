import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Login } from './login/login';
// Importações dos seus componentes existentes
import { Dashboard } from './dashboard/dashboard';
import { Children } from './children/children';
import { ChildDetail } from './children/child-detail/child-detail';
import { Vaccines } from './vaccines/vaccines';
import { Campaigns } from './campaigns/campaigns';
import { ReportsChildren } from './reports-children/reports-children';
import { Activities } from './activities/activities';

export const routes: Routes = [
{ path: 'login', component: Login },

  {
    path: '',
    canActivate: [AuthGuard],           // ← Protege todas as rotas abaixo
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'children', component: Children },
      { path: 'children/:id', component: ChildDetail },
      { path: 'vaccines', component: Vaccines },
      { path: 'campaigns', component: Campaigns },
      { path: 'reports', component: ReportsChildren },
      { path: 'activities', component: Activities },
    ]
  },

  { path: '**', redirectTo: '/login' }
];