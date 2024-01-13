import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainWelcomeComponent } from './main/main-welcome/main-welcome.component';
import { MainMotorComponent } from './main/main-motor/main-motor.component';

const routes: Routes = [
  { path: '', component: MainWelcomeComponent },
  { path: 'motor', component: MainMotorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
