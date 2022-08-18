import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionComponent } from './institution.component';
import { InstitutionListComponent } from './institution-list/institution-list.component';
import { InstitutionFormComponent } from './institution-form/institution-form.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '@shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    InstitutionComponent,
    InstitutionListComponent,
    InstitutionFormComponent,
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    //PrimeNg
    ButtonModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    RippleModule,
    MessageModule,
    PasswordModule,
    TableModule,
    ToolbarModule,
    TooltipModule,
    ToastModule,
    PaginatorModule,
    KeyFilterModule,
    DialogModule,
  ],
})
export class InstitutionModule {}
