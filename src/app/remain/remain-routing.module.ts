import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemainPage } from './remain.page';

const routes: Routes = [
  {
    path: '',
    component: RemainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemainPageRoutingModule {}
