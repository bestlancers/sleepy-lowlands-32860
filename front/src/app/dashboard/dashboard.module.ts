import { dashboardRoutes } from './dashboard.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RegFormComponent } from './reg-form/reg-form.component';
import { AppTrackNumComponent } from './modals/app-track-num/app-track-num.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExtraDetailsComponent } from './modals/extra-details/extra-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { DashStatsComponent } from './dash-stats/dash-stats.component';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteRowDialogComponent } from './modals/delete-row-dialog/delete-row-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { EditRowDialogComponent } from './modals/edit-row-dialog/edit-row-dialog.component';
import { ViewRowDetailsComponent } from './modals/view-row-details/view-row-details.component';
import { DashTableViewComponent } from './dash-stats/dash-table-view/dash-table-view.component';

@NgModule({
  declarations: [HomeComponent, RegFormComponent, AppTrackNumComponent, ExtraDetailsComponent, DashHeaderComponent, DashStatsComponent, DeleteRowDialogComponent, EditRowDialogComponent, ViewRowDetailsComponent, DashTableViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ChartsModule
  ],
})
export class DashboardModule { }
