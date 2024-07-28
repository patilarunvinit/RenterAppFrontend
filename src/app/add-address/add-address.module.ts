import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAddressPageRoutingModule } from './add-address-routing.module';

import { AddAddressPage } from './add-address.page';

import { Keyboard } from '@ionic-native/keyboard/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAddressPageRoutingModule,
    
  ],
  declarations: [AddAddressPage],
  providers: [
    Keyboard, 
  ],
})
export class AddAddressPageModule {}
