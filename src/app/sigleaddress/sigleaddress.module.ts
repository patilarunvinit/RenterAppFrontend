import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigleaddressPageRoutingModule } from './sigleaddress-routing.module';

import { SigleaddressPage } from './sigleaddress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigleaddressPageRoutingModule
  ],
  declarations: [SigleaddressPage]
})
export class SigleaddressPageModule {}
