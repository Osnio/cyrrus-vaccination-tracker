import { Dashboard } from './dashboard/dashboard';
import { Routes } from '@angular/router';
import { Children } from './children/children';
import { ChildDetail } from './children/child-detail/child-detail';
import { Vaccines } from './vaccines/vaccines';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'children', component: Children },
  { path: 'children/:id', component: ChildDetail },
  { path: 'vaccines', component: Vaccines },
  // { path: 'vaccines', component:  },


];
