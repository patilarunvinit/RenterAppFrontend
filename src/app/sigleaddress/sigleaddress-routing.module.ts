import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigleaddressPage } from './sigleaddress.page';

const routes: Routes = [
  {
    path: '',
    component: SigleaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigleaddressPageRoutingModule {}
