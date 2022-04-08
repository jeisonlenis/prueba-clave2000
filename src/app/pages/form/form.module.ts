import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAddComponent } from './form-add/form-add.component';
import { FormService } from '../../services/form.service';
import { FormRoutingModule } from './form.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

@NgModule({
  declarations: [FormComponent, FormAddComponent],
  imports: [CommonModule, FormRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [],
  providers: [FormService],
})
export class FormModule {}
