import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpasswordPage } from './cpassword.page';

const routes: Routes = [
  {
    path: '',
    component: CpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CpasswordPageRoutingModule {}
