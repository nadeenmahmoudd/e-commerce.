import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteListComponent } from './favourite-list.component';

const routes: Routes = [{ path: '', component: FavouriteListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouriteListRoutingModule { }
