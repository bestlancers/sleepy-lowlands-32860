import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routing';
import { HeaderComponent } from './header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [LoginComponent, HeaderComponent],
  imports: [
  RouterModule.forChild(authRoutes),
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class AuthModule { }
