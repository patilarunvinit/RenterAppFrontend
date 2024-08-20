import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemainPageRoutingModule } from './remain-routing.module';

import { RemainPage } from './remain.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemainPageRoutingModule
  ],
  declarations: [RemainPage],
  providers: [
    Keyboard, 
  ],
})
export class RemainPageModule {}
