import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'main-home',
    loadChildren: () => import('./main-home/main-home.module').then( m => m.MainHomePageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'add-renter',
    loadChildren: () => import('./addrenter/addrenter.module').then( m => m.AddrenterPageModule)
  },
  {
    path: 'managerent',
    loadChildren: () => import('./managerent/managerent.module').then( m => m.ManagerentPageModule)
  },
  {
    path: 'listadrress',
    loadChildren: () => import('./listadrress/listadrress.module').then( m => m.ListadrressPageModule)
  },
  {
    path: 'sigleaddress',
    loadChildren: () => import('./sigleaddress/sigleaddress.module').then( m => m.SigleaddressPageModule)
  },
  {
    path: 'rent',
    loadChildren: () => import('./rent/rent.module').then( m => m.RentPageModule)
  },
  {
    path: 'remain',
    loadChildren: () => import('./remain/remain.module').then( m => m.RemainPageModule)
  },
  {
    path: 'historyremain',
    loadChildren: () => import('./historyremain/historyremain.module').then( m => m.HistoryremainPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
