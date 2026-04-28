import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteHeaderComponent } from '../../shared/site-header.component';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { DataService } from '../../services/data.service';
import { FavoritesService } from '../../services/favorites.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-detail',
  imports: [SiteHeaderComponent, SiteFooterComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private data = inject(DataService);
  private favs = inject(FavoritesService);
  private fb = inject(FormBuilder);

  service = signal<Service | null>(null);
  notFound = signal<boolean>(false);
  quickStatus = signal<string | null>(null);

  quickForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      const id = p.get('id');
      if (!id) { this.notFound.set(true); return; }
      this.data.getServiceById(id).subscribe((s) => {
        if (!s) this.notFound.set(true);
        else {
          this.service.set(s);
          document.title = `${s.title} · KINETIC`;
        }
      });
    });
  }

  isFav(): boolean {
    const s = this.service();
    return !!s && this.favs.isFavoriteService(s.id);
  }

  toggleFav(): void {
    const s = this.service();
    if (s) this.favs.toggleService(s.id);
  }

  detailVisualClass(): string {
    const map: Record<string, string> = {
      cyan: 'detail-visual--cyan',
      navy: 'detail-visual--navy',
      violet: 'detail-visual--violet',
      teal: 'detail-visual--teal',
      orange: 'detail-visual--orange',
      green: 'detail-visual--green'
    };
    return map[this.service()?.imageVariant ?? 'cyan'] || 'detail-visual--cyan';
  }

  goConsult(): void {
    this.router.navigate(['/'], { fragment: 'contacto' });
  }

  submitQuick(): void {
    if (this.quickForm.invalid) {
      this.quickForm.markAllAsTouched();
      return;
    }
    this.quickStatus.set('Solicitud enviada (demo). Un consultor contactará pronto.');
    this.quickForm.reset();
  }

  emailInvalid(): boolean {
    const c = this.quickForm.get('email');
    return !!c && c.invalid && (c.touched || c.dirty);
  }
}
