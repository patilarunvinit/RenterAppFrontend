import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadrressPage } from './listadrress.page';

const routes: Routes = [
  {
    path: '',
    component: ListadrressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadrressPageRoutingModule {}
