import { Routes } from '@angular/router';
import { ROUTE_PATHS } from './route-paths';

export const routes: Routes = [
  {
    path: ROUTE_PATHS.Main,
    data: { haveMenu: false },
    loadComponent: () => import('pages/main').then((x) => x.MainPageComponent),
  },
  {
    path: ROUTE_PATHS.Shop,
    data: { haveMenu: true },
    loadComponent: () => import('pages/shop').then((x) => x.ShopPageComponent),
  },
  {
    path: ':category/:id',
    loadComponent: () => import('pages/item').then((x) => x.ItemPageComponent),
  },
  {
    path: ROUTE_PATHS.Admin,
    loadComponent: () => import('pages/admin').then((x) => x.AdminPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
