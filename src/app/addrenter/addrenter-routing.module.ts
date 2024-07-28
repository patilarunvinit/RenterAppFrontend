import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddrenterPage } from './addrenter.page';

const routes: Routes = [
  {
    path: '',
    component: AddrenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddrenterPageRoutingModule {}
