import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteHeaderComponent } from '../../shared/site-header.component';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { DataService } from '../../services/data.service';
import { Service } from '../../models/service.model';

const CATEGORY_BADGES: Record<string, string> = {
  consultoria: 'Consultoría',
  tecnologia: 'Tecnología',
  logistica: 'Logística',
  energia: 'Energía'
};

function guessCategoryKey(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('logíst') || t.includes('cadena') || t.includes('suminist')) return 'logistica';
  if (t.includes('energía') || t.includes('energi') || t.includes('sostenib')) return 'energia';
  if (t.includes('consultor') || t.includes('liderazgo') || t.includes('strateg')) return 'consultoria';
  return 'tecnologia';
}

@Component({
  selector: 'app-panel',
  imports: [SiteHeaderComponent, SiteFooterComponent, ReactiveFormsModule],
  templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {
  private data = inject(DataService);
  private fb = inject(FormBuilder);

  services = signal<Service[]>([]);

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    image: ['']
  });

  ngOnInit(): void {
    this.data.load().subscribe((d) => {
      const seeded = d.services.map((s, i) => ({
        ...s,
        _panelId: `KNT-${9000 + i * 100}`
      }));
      this.services.set(seeded);
    });
  }

  fieldInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  errorMessage(name: string): string {
    const c = this.form.get(name);
    if (!c?.errors) return '';
    if (c.errors['required']) return name === 'title' ? 'El título es obligatorio.' : 'La descripción es obligatoria.';
    if (c.errors['minlength']) return 'La descripción debe tener al menos 10 caracteres.';
    return '';
  }

  badgeFor(s: Service): string {
    return CATEGORY_BADGES[s.categoryKey] || s.category || 'Tecnología';
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, description, image } = this.form.value;
    const catKey = guessCategoryKey(title);
    const newService: Service = {
      id: `custom-${Date.now()}`,
      _panelId: `KNT-${1000 + this.services().length}`,
      title: title.trim(),
      shortDescription: description.trim(),
      description: description.trim(),
      category: CATEGORY_BADGES[catKey],
      categoryKey: catKey,
      image: image?.trim() || '',
      badge: 'NUEVO SERVICIO',
      heroTitlePrefix: '',
      heroTitleHighlight: title.trim(),
      heroTitleSuffix: '',
      imageVariant: 'cyan',
      capabilities: []
    };
    this.services.update((arr) => [newService, ...arr]);
    this.form.reset({ title: '', description: '', image: '' });
  }

  remove(idx: number): void {
    const s = this.services()[idx];
    if (!s) return;
    if (confirm(`¿Eliminar servicio "${s.title}"?`)) {
      this.services.update((arr) => arr.filter((_, i) => i !== idx));
    }
  }

  edit(idx: number): void {
    const s = this.services()[idx];
    if (!s) return;
    const newTitle = prompt('Nuevo título:', s.title);
    if (newTitle && newTitle.trim()) {
      this.services.update((arr) => arr.map((x, i) => (i === idx ? { ...x, title: newTitle.trim() } : x)));
    }
  }
}
