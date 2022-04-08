import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAddComponent } from './form-add/form-add.component';
import { FormComponent } from './form.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    children: [{ path: 'form-add', component: FormAddComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
