import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SiteFooterComponent } from '../../shared/site-footer.component';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, SiteFooterComponent, RouterLink],
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loading = signal(false);
  status = signal<string | null>(null);

  loginForm: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });

  fieldInvalid(_name: string): boolean {
    return false;
  }

  errorMessage(_name: string): string {
    return '';
  }

  submit(): void {
    this.loading.set(true);
    this.status.set('Acceso concedido. Redirigiendo al panel…');
    setTimeout(() => this.router.navigateByUrl('/panel'), 400);
  }
}
