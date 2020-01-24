import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';

// Regsiter every module under admin url here for lazy loading 
const routes: Routes = [
  
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule',
   
  },
  {
    path: 'dashboard',
    loadChildren: './pages/index/index.module#IndexModule',
    canActivate:[AuthGuard],
  },
  {
    path: 'users',
    loadChildren: './pages/users/users.module#UsersModule',
    canActivate:[AuthGuard],
  },
  {
    path: 'products',
    loadChildren: './pages/products/products.module#ProductsModule',
    canActivate:[AuthGuard],
  },

  {
    path: 'categories',
    loadChildren: './pages/categories/categories.module#CategoriesModule',
    canActivate:[AuthGuard],
  },

  {
    path: 'brands',
    loadChildren: './pages/brands/brands.module#BrandsModule',
    canActivate:[AuthGuard],
  },
  {
    path: 'premiumbrands',
    loadChildren: './pages/premiumbrands/premiumbrands.module#PremiumbrandsModule',
    canActivate:[AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
