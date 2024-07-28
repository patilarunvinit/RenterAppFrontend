import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddrenterPageRoutingModule } from './addrenter-routing.module';

import { AddrenterPage } from './addrenter.page';
import { Keyboard } from '@ionic-native/keyboard/ngx'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddrenterPageRoutingModule
  ],
  declarations: [AddrenterPage],
  providers: [
    Keyboard, 
  ],
})
export class AddrenterPageModule {}
