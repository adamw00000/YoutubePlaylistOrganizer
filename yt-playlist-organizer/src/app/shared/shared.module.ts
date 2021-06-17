import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { SafePipe } from './pipes/safe-pipe';



@NgModule({
  declarations: [
    ButtonToggleComponent,
    SafePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonToggleComponent,
    SafePipe,
  ]
})
export class SharedModule { }
