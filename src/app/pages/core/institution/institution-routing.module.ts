import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExitGuard } from '@shared/guards';
import { InstitutionFormComponent } from './institution-form/institution-form.component';
import { InstitutionComponent } from './institution.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionComponent,
  },
  {
    path: ':id',
    component: InstitutionFormComponent,
    canDeactivate: [ExitGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionRoutingModule {}
