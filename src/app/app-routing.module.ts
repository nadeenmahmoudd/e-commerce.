import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { NavbarBlankComponent } from './components/navbar-blank/navbar-blank.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';

const routes: Routes = [
  {path:"",component:BlankLayoutComponent, canActivate:[authGuard],children:[
    {path:"",redirectTo:'home' , pathMatch:"full"},
    {path:"home",component:HomeComponent},
    { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
    {path:"categories",component:CategoriesComponent},
    {path:"checkout/:id",component:CheckoutComponent},
    {path:"allorders",component:AllOrdersComponent},
    {path:"products",component:ProductsComponent},
    {path:"brands", component:BrandsComponent},
    {path:"details/:id", component:ProductDetailsComponent},
    { path: 'favouriteList', loadChildren: () => import('./favourite-list/favourite-list.module').then(m => m.FavouriteListModule) },

  ]},
  {path:"",component:AuthLayoutComponent, children:[
    {path:"",redirectTo:'register' , pathMatch:"full"},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},  
  ]},
 
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
