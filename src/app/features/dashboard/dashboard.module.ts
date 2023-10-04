import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { OffcanvasComponent } from './components/offcanvas/offcanvas.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from 'src/app/shared/components/form-field/input/input.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';

@NgModule({
  declarations: [DashboardComponent, OffcanvasComponent, UserFormComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatDialogModule,
    ReactiveFormsModule,
    InputComponent,
    EmptyStateComponent,
  ],
})
export class DashboardModule {}
