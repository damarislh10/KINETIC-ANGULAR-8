import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Service } from '../models/service.model';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-service-card',
  imports: [RouterLink],
  template: `
    <article class="service-card" [attr.data-service-id]="service.id">
      <div class="service-card__media" [class]="'service-card__media ' + mediaClass()">
        @if (service.image) {
          <img class="service-card__img" [src]="service.image" [alt]="service.title" loading="lazy" />
        }
        <div class="service-card__pattern" aria-hidden="true"></div>
        <span class="service-card__badge">{{ service.category }}</span>
        <button
          type="button"
          class="fav-toggle"
          [class.fav-toggle--on]="isFav()"
          [class.fav-toggle--off]="!isFav()"
          [attr.aria-pressed]="isFav()"
          [attr.aria-label]="isFav() ? 'Quitar de favoritos' : 'Añadir a favoritos'"
          (click)="toggleFav($event)"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
      <div class="service-card__body">
        <h3 class="service-card__title">{{ service.title }}</h3>
        <p class="service-card__desc">{{ service.shortDescription }}</p>
        @if (showLink) {
          <a class="service-card__link" [routerLink]="['/servicio', service.id]">Ver Detalle →</a>
        }
      </div>
    </article>
  `
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: Service;
  @Input() showLink = true;

  private favs = inject(FavoritesService);

  isFav(): boolean {
    return this.favs.serviceIds().includes(this.service.id);
  }

  toggleFav(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.favs.toggleService(this.service.id);
  }

  mediaClass(): string {
    const map: Record<string, string> = {
      cyan: 'service-card__media--cyan',
      navy: 'service-card__media--navy',
      violet: 'service-card__media--violet',
      teal: 'service-card__media--teal',
      orange: 'service-card__media--orange',
      green: 'service-card__media--green'
    };
    return map[this.service.imageVariant] || 'service-card__media--cyan';
  }
}
