import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/site-header.component';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { DataService } from '../../services/data.service';
import { FavoritesService } from '../../services/favorites.service';
import { Principle, TeamMember } from '../../models/service.model';

@Component({
  selector: 'app-nosotros',
  imports: [SiteHeaderComponent, SiteFooterComponent, RouterLink],
  templateUrl: './nosotros.component.html'
})
export class NosotrosComponent implements OnInit {
  private data = inject(DataService);
  private favs = inject(FavoritesService);

  principles = signal<Principle[]>([]);
  team = signal<TeamMember[]>([]);

  @ViewChild('teamCarousel') carousel?: ElementRef<HTMLDivElement>;

  toneClass: Record<string, string> = {
    orange: 'principle-card__icon--orange',
    blue: 'principle-card__icon--blue',
    pink: 'principle-card__icon--pink',
    purple: 'principle-card__icon--purple'
  };

  ngOnInit(): void {
    this.data.load().subscribe((d) => {
      this.principles.set(d.principles);
      this.team.set(d.team);
    });
  }

  iconClass(p: Principle): string {
    return this.toneClass[p.tone] || this.toneClass['orange'];
  }

  isTeamFav(id: string): boolean {
    return this.favs.isFavoriteTeam(id);
  }

  toggleTeam(id: string): void {
    this.favs.toggleTeam(id);
  }

  scrollPrev(): void {
    this.carousel?.nativeElement.scrollBy({ left: -320, behavior: 'smooth' });
  }

  scrollNext(): void {
    this.carousel?.nativeElement.scrollBy({ left: 320, behavior: 'smooth' });
  }
}
