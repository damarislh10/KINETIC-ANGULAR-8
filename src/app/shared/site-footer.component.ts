import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div>
          <div class="site-footer__brand">KINETIC</div>
          <p class="site-footer__copy">© 2026 KINETIC CORPORATE. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
        <nav class="site-footer__links" aria-label="Legal">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a [routerLink]="['/']" fragment="contacto">Soporte</a>
          <a href="#">Cookies</a>
        </nav>
        <div class="site-footer__icons">
          <button type="button" class="icon-btn" aria-label="Compartir">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
          </button>
          <button type="button" class="icon-btn" aria-label="Red">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity=".3" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  `
})
export class SiteFooterComponent {}
