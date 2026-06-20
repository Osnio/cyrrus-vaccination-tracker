import { Dashboard } from './dashboard/dashboard';
import { Routes } from '@angular/router';
import { Children } from './children/children';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'children', component: Children },

];
