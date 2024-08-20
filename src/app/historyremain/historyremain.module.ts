import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryremainPageRoutingModule } from './historyremain-routing.module';

import { HistoryremainPage } from './historyremain.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryremainPageRoutingModule
  ],
  declarations: [HistoryremainPage],
  providers: [
    Keyboard, 
  ],
})
export class HistoryremainPageModule {}
