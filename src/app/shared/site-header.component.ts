import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="site-logo" routerLink="/">KINETIC</a>
        <nav class="site-nav" aria-label="Principal">
          <a class="site-nav__link" routerLink="/" routerLinkActive="site-nav__link--active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
          <a class="site-nav__link" routerLink="/catalogo" routerLinkActive="site-nav__link--active">Servicios</a>
          <a class="site-nav__link" [routerLink]="['/catalogo']" [queryParams]="{ filter: 'favorites' }">Favoritos</a>
          <a class="site-nav__link" routerLink="/" fragment="contacto">Contacto</a>
          <a class="site-nav__link" routerLink="/nosotros" routerLinkActive="site-nav__link--active">Nosotros</a>
        </nav>
        <div class="site-header__actions">
          <label class="sr-only" for="site-search">Buscar</label>
          <input id="site-search" class="search-field" type="search" placeholder="Buscar..." autocomplete="off" />
          <a class="btn btn--primary btn--pill" routerLink="/admin">Acceso Admin</a>
        </div>
      </div>
    </header>
  `
})
export class SiteHeaderComponent {
  @Input() activePage?: 'home' | 'catalog' | 'nosotros';
}
