import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParaComponent } from './para/para.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SerComponent } from './ser/ser.component';
import { StartAuthCheckComponent } from './start-auth-check/start-auth-check.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: StartAuthCheckComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'para',
    component: ParaComponent
  },
  {
    path: 'ser',
    component: SerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
