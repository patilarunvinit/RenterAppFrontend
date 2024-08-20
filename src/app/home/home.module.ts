import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,  ReactiveFormsModule  } from '@angular/forms';
import { HomePage } from './home.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { MatButtonModule } from '@angular/material/button';

import { MatLabel } from '@angular/material/form-field';

import { HomePageRoutingModule } from './home-routing.module';


import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatLabel,
    MatButtonModule,
    ReactiveFormsModule,
    
    
  ],
  declarations: [HomePage],
  providers: [
    Keyboard, 
  ],
})
export class HomePageModule {}
