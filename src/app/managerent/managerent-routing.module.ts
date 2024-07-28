import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerentPage } from './managerent.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerentPageRoutingModule {}
