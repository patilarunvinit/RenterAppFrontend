import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CpasswordPageRoutingModule } from './cpassword-routing.module';

import { CpasswordPage } from './cpassword.page';

import { Keyboard } from '@ionic-native/keyboard/ngx'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CpasswordPageRoutingModule
  ],
  declarations: [CpasswordPage],
  providers: [
    Keyboard, 
  ],
})
export class CpasswordPageModule {}
