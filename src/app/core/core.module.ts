import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { SSErrorService } from './services/ss-errors.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastrModule.forRoot(), HttpClientModule],
  providers: [SSErrorService, ToastrService],
})
export class CoreModule {}
