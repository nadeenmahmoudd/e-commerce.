import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouriteListRoutingModule } from './favourite-list-routing.module';
import { FavouriteListComponent } from './favourite-list.component';
import { AppModule } from '../app.module';


@NgModule({
  declarations: [
    FavouriteListComponent,
  ],
  imports: [
    CommonModule,
    FavouriteListRoutingModule,
    
  ]
})
export class FavouriteListModule { }
