import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/site-header.component';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { ServiceCardComponent } from '../../shared/service-card.component';
import { DataService } from '../../services/data.service';
import { Service, Testimonial } from '../../models/service.model';

@Component({
  selector: 'app-home',
  imports: [
    SiteHeaderComponent,
    SiteFooterComponent,
    ServiceCardComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private data = inject(DataService);
  private fb = inject(FormBuilder);

  services = signal<Service[]>([]);
  testimonials = signal<Testimonial[]>([]);
  modalOpen = signal(false);
  statusMessage = signal<string | null>(null);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit(): void {
    this.data.load().subscribe((d) => {
      this.services.set(d.services);
      this.testimonials.set(d.testimonials);
    });
  }

  fieldInvalid(name: string): boolean {
    const c = this.contactForm.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  errorMessage(name: string): string {
    const c = this.contactForm.get(name);
    if (!c || !c.errors) return '';
    if (c.errors['required']) {
      if (name === 'name') return 'El nombre es obligatorio.';
      if (name === 'message') return 'El mensaje es obligatorio.';
    }
    if (c.errors['email']) return 'Introduce un correo electrónico válido.';
    if (c.errors['minlength']) return 'El mensaje debe tener al menos 10 caracteres.';
    return '';
  }

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    const { name, company } = this.contactForm.value;
    this.statusMessage.set(
      `Gracias, ${name}. Hemos recibido tu mensaje${company ? ` (${company})` : ''}. Te contactaremos pronto.`
    );
    this.contactForm.reset();
  }

  openModal(): void { this.modalOpen.set(true); }
  closeModal(): void { this.modalOpen.set(false); }
}
