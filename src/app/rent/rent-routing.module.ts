import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentPage } from './rent.page';

const routes: Routes = [
  {
    path: '',
    component: RentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentPageRoutingModule {}
