import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portal-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <div class="container header-inner">
        <a routerLink="/" class="logo-wrap">
          <img src="/assets/images/finkylogo.jpg" alt="Finky" class="logo" />
        </a>

        <nav class="nav">
          <div class="nav-links">
            <a class="nav-link" routerLink="/que-es-finky" routerLinkActive="active"
              >Qué es Finky</a
            >
            <a class="nav-link" routerLink="/instituciones-aliadas" routerLinkActive="active"
              >Instituciones aliadas</a
            >
            <a class="nav-link" routerLink="/preguntas" routerLinkActive="active">FAQ</a>
            <a class="nav-link paga-cuota-btn" href="https://app.finky.la/pagos">Paga tu cuota</a>
          </div>

          <div class="nav-auth">
            <a href="https://app.finky.la/login" class="login-btn">Ingreso</a>
            <a href="https://app.finky.la/registro" class="register-btn">
              Registrarse
              <span class="material-icons">arrow_forward</span>
            </a>
          </div>

          <button class="mobile-toggle" (click)="toggleMobileMenu()" aria-label="Menu">
            <span class="material-icons">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
          </button>
        </nav>
      </div>

      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu" [class.open]="isMobileMenuOpen" (click)="toggleMobileMenu()">
        <!-- Mobile Menu Panel -->
        <div class="mobile-menu-panel" (click)="$event.stopPropagation()">
          <a
            class="mobile-link"
            routerLink="/que-es-finky"
            routerLinkActive="active"
            (click)="toggleMobileMenu()"
            >Qué es Finky</a
          >
          <a
            class="mobile-link"
            routerLink="/instituciones-aliadas"
            routerLinkActive="active"
            (click)="toggleMobileMenu()"
            >Instituciones aliadas</a
          >
          <a
            class="mobile-link"
            routerLink="/preguntas"
            routerLinkActive="active"
            (click)="toggleMobileMenu()"
            >FAQ</a
          >
          <a
            class="mobile-link paga-cuota-mobile"
            href="https://app.finky.la/pagos"
            (click)="toggleMobileMenu()"
            >Paga tu cuota</a
          >
          <div class="mobile-auth">
            <a href="https://app.finky.la/login" class="login-btn" (click)="toggleMobileMenu()"
              >Ingreso</a
            >
            <a
              href="https://app.finky.la/registro"
              class="register-btn"
              (click)="toggleMobileMenu()"
              >Registrarse</a
            >
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');

      :host {
        --header-height: 84px;
        --primary-orange: #f16c2d;
        --nav-text: #4b5563;
        --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        height: var(--header-height);
        display: flex;
        align-items: center;
        background: white;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        transition: var(--transition);
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .header.scrolled {
        height: 74px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
      }

      .container {
        max-width: 1300px;
        margin: 0 auto;
        padding: 0 40px;
        width: 100%;
      }

      .header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo-wrap {
        display: flex;
        align-items: center;
        text-decoration: none;
      }

      .logo {
        height: 48px;
        width: auto;
        transition: var(--transition);
        display: block;
      }

      .logo:hover {
        transform: scale(1.02);
      }

      .nav {
        display: flex;
        align-items: center;
        gap: 24px;
      }

      .nav-links {
        display: flex;
        gap: 20px;
        align-items: center;
      }

      .nav-link {
        font-size: 14px;
        font-weight: 600;
        color: var(--nav-text);
        text-decoration: none;
        transition: var(--transition);
        position: relative;
        padding: 8px 0;
      }

      .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--primary-orange);
        transition: var(--transition);
      }

      .nav-link:hover {
        color: var(--primary-orange);
      }

      .nav-link:hover::after,
      .nav-link.active::after {
        width: 100%;
      }

      .nav-link.active {
        color: var(--primary-orange);
      }

      .paga-cuota-btn {
        background: rgba(241, 108, 45, 0.08);
        color: var(--primary-orange) !important;
        padding: 8px 20px;
        border-radius: 50px;
        border: 2px solid var(--primary-orange);
        font-weight: 700;
      }

      .paga-cuota-btn:hover {
        background: var(--primary-orange);
        color: white !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(241, 108, 45, 0.3);
      }

      .nav-auth {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-left: 8px;
        padding-left: 20px;
        border-left: 1px solid rgba(0, 0, 0, 0.08);
      }

      .login-btn {
        font-size: 14px;
        color: var(--primary-orange);
        text-decoration: none;
        font-weight: 700;
        transition: var(--transition);
      }

      .register-btn {
        background: var(--primary-orange);
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
        transition: var(--transition);
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .register-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(241, 108, 45, 0.25);
      }

      .mobile-toggle {
        display: none;
        background: none;
        border: none;
        color: var(--primary-orange);
        cursor: pointer;
        padding: 8px;
        transition: var(--transition);
      }

      /* ========================================
         MOBILE MENU - Full Screen (default/mobile)
         ======================================== */
      .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1001;
        background: white;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
      }

      .mobile-menu.open {
        transform: translateX(0);
        pointer-events: auto;
      }

      .mobile-menu-panel {
        width: 100%;
        height: 100%;
        padding: 90px 10px 0px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
      }

      /* ========================================
         TABLET MENU - Side Drawer (600px-991px)
         ======================================== */
      @media (min-width: 600px) and (max-width: 991px) {
        .mobile-menu {
          background: rgba(0, 0, 0, 0);
          transform: none;
          opacity: 0;
          visibility: hidden;
          transition:
            opacity 0.3s ease,
            visibility 0.3s ease,
            background 0.3s ease;
        }

        .mobile-menu.open {
          background: rgba(17, 24, 39, 0.4);
          backdrop-filter: blur(8px);
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-panel {
          position: absolute;
          top: 0;
          right: 0;
          width: 400px;
          height: 100%;
          background: white;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
          padding: 100px 32px 40px;
        }

        .mobile-menu.open .mobile-menu-panel {
          transform: translateX(0);
        }
      }

      /* ========================================
         MENU ITEMS
         ======================================== */
      .mobile-link {
        font-size: 19px;
        font-weight: 600;
        color: #1e293b;
        text-decoration: none;
        padding: 16px 20px;
        border-radius: 12px;
        transition: var(--transition);
        margin-bottom: 4px;
        margin-right: 20px;
        display: block;
      }

      .mobile-link.active {
        color: var(--primary-orange);
        background: rgba(241, 108, 45, 0.08);
      }

      .paga-cuota-mobile {
        background: var(--primary-orange);
        color: white !important;
        padding: 16px;
        border-radius: 12px;
        text-align: center;
        margin-top: 12px;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(241, 108, 45, 0.2);
        display: block;
        text-decoration: none;
      }

      .mobile-auth {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-top: 24px;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        margin-right: 20px;
      }

      .mobile-auth .login-btn {
        text-align: center;
        padding: 14px;
        border: 2px solid rgba(241, 108, 45, 0.2);
        border-radius: 12px;
        display: block;
        font-size: 15px;
      }

      .mobile-auth .register-btn {
        justify-content: center;
        padding: 16px;
        display: flex;
        font-size: 15px;
      }

      /* Hide Lina when menu is open */
      ::ng-deep body.menu-open .lina-trigger {
        display: none !important;
      }

      /* ========================================
         RESPONSIVE BREAKPOINTS
         ======================================== */
      @media (max-width: 1280px) {
        .container {
          padding: 0 32px;
        }
        .nav {
          gap: 16px;
        }
      }

      @media (max-width: 991px) {
        .nav-links,
        .nav-auth {
          display: none;
        }
        .mobile-toggle {
          display: block;
          position: relative;
          z-index: 1002;
        }
        .header {
          height: 72px;
        }
        .logo {
          height: 36px;
        }
      }
    `,
  ],
})
export class PortalHeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  public toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (typeof document !== 'undefined') {
      if (this.isMobileMenuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    }
  }
}
