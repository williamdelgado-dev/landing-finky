import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portal-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="grid">
          <div class="brand-col">

            <p class="footer-desc">
              Facilitamos el acceso a la educación superior, sin historial crediticio ni codeudor.
            </p>
            <div class="social-links">
              <a href="#" class="social-icon" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" class="social-icon" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" class="social-icon" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <a href="#" class="social-icon" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 class="footer-heading">Enlaces</h4>
            <ul class="footer-links">
              <li><a href="#aliadas">Instituciones aliadas</a></li>
              <li><a href="#simula">Simulador de crédito</a></li>
              <li><a href="#faq">Preguntas frecuentes</a></li>
              <li><a routerLink="/que-es-finky">Qué es Finky</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-heading">Documentos</h4>
            <ul class="footer-links">
              <li><a href="#">Tratamiento de datos</a></li>
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Políticas de cobranza</a></li>
              <li><a href="#">Defensor del consumidor</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-heading">Ayuda y Contacto</h4>
            <ul class="footer-links">
              <li class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +57 320 308 0644
              </li>
              <li class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                hablemos&#64;finky.la
              </li>
              <li style="margin-top: 12px;">
                <a href="https://wa.link/xn4ncn" class="whatsapp-btn" target="_blank" rel="noopener">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="copyright">© 2024 Finky. Todos los derechos reservados.</div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: #111827;
        color: white;
        padding: 48px 16px;
      }
      .container {
        max-width: 1152px;
        margin: 0 auto;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px;
      }
      @media (min-width: 768px) {
        .grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      .footer-logo {
        height: 48px;
        margin-bottom: 16px;
        object-fit: contain;
      }
      .footer-desc {
        font-size: 14px;
        color: #9ca3af;
        line-height: 1.6;
        margin-bottom: 24px;
      }
      .social-links {
        display: flex;
        gap: 12px;
      }
      .social-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: #1f2937;
        color: #9ca3af;
        border-radius: 8px;
        transition: all 0.3s;
        text-decoration: none;
      }
      .social-icon:hover {
        background: #ff6b35;
        color: white;
        transform: translateY(-3px);
      }
      .footer-heading {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 20px;
        color: white;
      }
      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .footer-links a {
        font-size: 14px;
        color: #9ca3af;
        text-decoration: none;
        transition: color 0.2s;
      }
      .footer-links a:hover {
        color: #ff6b35;
      }
      .footer-links li {
        font-size: 14px;
        color: #9ca3af;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .contact-item {
        color: #9ca3af !important;
      }
      .whatsapp-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #25d366;
        color: white !important;
        padding: 8px 20px;
        border-radius: 9999px;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s;
      }
      .whatsapp-btn:hover {
        background: #1faf54;
        color: white !important;
        transform: scale(1.05);
      }
      .copyright {
        max-width: 1200px;
        margin: 48px auto 0;
        padding-top: 32px;
        border-top: 1px solid #1f2937;
        text-align: center;
        font-size: 13px;
        color: #4b5563;
      }
    `,
  ],
})
export class PortalFooterComponent {}
