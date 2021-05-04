import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { RegFormComponent } from './reg-form/reg-form.component';
import { DashStatsComponent } from './dash-stats/dash-stats.component';
export const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'registru',
    pathMatch: 'full'
  },
  {
    path: 'registru',
    component: HomeComponent,
  },
  {
    path: 'statistici',
    component: DashStatsComponent,
  },
  {
    path: 'para',
    component: RegFormComponent,
  }
];
