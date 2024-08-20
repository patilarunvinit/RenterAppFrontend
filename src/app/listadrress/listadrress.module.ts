import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadrressPageRoutingModule } from './listadrress-routing.module';

import { ListadrressPage } from './listadrress.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadrressPageRoutingModule
  ],
  declarations: [ListadrressPage],
  providers: [
    Keyboard, 
  ],
})
export class ListadrressPageModule {}
