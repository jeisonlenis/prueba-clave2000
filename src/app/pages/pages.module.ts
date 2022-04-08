import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { FormModule } from './form/form.module';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages.routing';

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, FormsModule, PagesRoutingModule],
  exports: [PagesComponent],
  providers: [],
})
export class PagesModule {}
