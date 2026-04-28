import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/site-header.component';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { ServiceCardComponent } from '../../shared/service-card.component';
import { DataService } from '../../services/data.service';
import { FavoritesService } from '../../services/favorites.service';
import { Service } from '../../models/service.model';

interface Pill {
  key: string;
  label: string;
}

@Component({
  selector: 'app-catalog',
  imports: [SiteHeaderComponent, SiteFooterComponent, ServiceCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
  private data = inject(DataService);
  private favs = inject(FavoritesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pills: Pill[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'consultoria', label: 'Consultoría' },
    { key: 'tecnologia', label: 'Tecnología' },
    { key: 'logistica', label: 'Logística' },
    { key: 'energia', label: 'Energía' }
  ];

  all = signal<Service[]>([]);
  activeCategory = signal<string>('todos');
  favoritesOnly = signal<boolean>(false);

  filtered = computed(() => {
    const cat = this.activeCategory();
    const onlyFav = this.favoritesOnly();
    const favIds = new Set(this.favs.serviceIds());
    return this.all().filter((s) => {
      if (onlyFav && !favIds.has(s.id)) return false;
      if (cat !== 'todos' && s.categoryKey !== cat) return false;
      return true;
    });
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((p) => {
      this.favoritesOnly.set(p.get('filter') === 'favorites');
      const cat = p.get('category');
      if (cat && this.pills.some((x) => x.key === cat)) this.activeCategory.set(cat);
    });
    this.data.load().subscribe((d) => this.all.set(d.services));
  }

  selectCategory(key: string): void {
    this.favoritesOnly.set(false);
    this.activeCategory.set(key);
    this.updateUrl();
  }

  selectFavorites(): void {
    this.favoritesOnly.set(true);
    this.updateUrl();
  }

  private updateUrl(): void {
    const queryParams: Record<string, string | null> = {
      filter: this.favoritesOnly() ? 'favorites' : null,
      category: !this.favoritesOnly() && this.activeCategory() !== 'todos' ? this.activeCategory() : null
    };
    this.router.navigate([], { queryParams, queryParamsHandling: 'merge', replaceUrl: true });
  }
}
