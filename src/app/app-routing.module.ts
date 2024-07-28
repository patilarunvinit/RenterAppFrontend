import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'add-address',
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
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
