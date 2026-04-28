import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: 'catalogo', loadComponent: () => import('./pages/catalog/catalog.component').then((m) => m.CatalogComponent) },
  { path: 'servicio/:id', loadComponent: () => import('./pages/detail/detail.component').then((m) => m.DetailComponent) },
  { path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent) },
  { path: 'panel', loadComponent: () => import('./pages/panel/panel.component').then((m) => m.PanelComponent) },
  { path: 'nosotros', loadComponent: () => import('./pages/nosotros/nosotros.component').then((m) => m.NosotrosComponent) },
  { path: '**', redirectTo: '' }
];
