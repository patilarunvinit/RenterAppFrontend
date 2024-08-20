import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerentPageRoutingModule } from './managerent-routing.module';

import { ManagerentPage } from './managerent.page';
import { Keyboard } from '@ionic-native/keyboard/ngx'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerentPageRoutingModule
  ],
  declarations: [ManagerentPage],
  providers: [
    Keyboard, 
  ],
})
export class ManagerentPageModule {}
