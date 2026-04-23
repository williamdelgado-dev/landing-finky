import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PortalHeaderComponent } from '@site/components/header/header.component';
import { PortalFooterComponent } from '@site/components/footer/footer.component';
import { UniversityService } from '@site/services/university.service';
import { inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Institucion {
  id?: number;
  nombre: string;
  logo: string;
  ciudad: string;
  tipo: 'Universidad' | 'Corporación' | 'Institución' | 'Fundación';
  slug?: string | null;
  modalidades: string[];
}

import { LinaPortalComponent } from '@site/components/lina-portal/lina-portal.component';

@Component({
  selector: 'app-instituciones-aliadas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PortalHeaderComponent,
    PortalFooterComponent,
    LinaPortalComponent,
  ],
  templateUrl: './instituciones-aliadas.component.html',
  styleUrl: './instituciones-aliadas.component.css',
})
export class InstitucionesAliadasComponent implements OnInit {
  private universityService = inject(UniversityService);
  private router = inject(Router);

  public apiUniversities = this.universityService.universities;
  public isLoading = this.universityService.loading;

  searchTerm = '';

  /** Logos locales por defecto para IES que aún no tienen iconUniversity en S3 */
  private readonly fallbackLogos: Record<number, string> = {
    // Areandina
    1: '/assets/images/universities/areandina.png',
    // San Mateo
    2: '/assets/images/universities/san-mateo.png',
    // Unincca
    16: '/assets/images/universities/unincca.png',
    17: '/assets/images/universities/unincca.png',
    // Unitec
    18: '/assets/images/universities/unitec.png',
    // Unimeta
    65: '/assets/images/universities/unimeta.png',
    66: '/assets/images/universities/unimeta.png',
    67: '/assets/images/universities/unimeta.png',
    78: '/assets/images/universities/unimeta.png',
    79: '/assets/images/universities/unimeta.png',
    // EAN
    68: '/assets/images/universities/ean.png',
    69: '/assets/images/universities/ean.png',
    70: '/assets/images/universities/ean.png',
    71: '/assets/images/universities/ean.png',
    // Ibero
    77: '/assets/images/universities/ibero.png',
    85: '/assets/images/universities/ibero.png',
    86: '/assets/images/universities/ibero.png',
  };

  ngOnInit() {
    this.loadApiData();
  }

  async loadApiData() {
    await this.universityService.getAllUniversities();
  }

  redirectToUniversity(slug: string | null | undefined) {
    if (slug) {
      window.open(`https://${slug}.finky.la`, '_blank');
    } else {
      this.router.navigate(['/'], { fragment: 'simulator' });
    }
  }

  /**
   * Resuelve el logo de la institución con la siguiente prioridad:
   * 1. landingConfig.iconUniversity (S3 remoto)
   * 2. fallbackLogos por ID (logo local en public/assets)
   * 3. Logo genérico de Finky
   */
  private resolveUniversityLogo(u: {
    id: number;
    landingConfig?: { iconUniversity?: string };
  }): string {
    if (u.landingConfig?.iconUniversity) {
      return `https://portal-legalizaciones.s3.us-east-1.amazonaws.com/${u.landingConfig.iconUniversity}`;
    }
    return this.fallbackLogos[u.id] ?? '/assets/images/finkylogo.jpg';
  }

  get institucionesFiltradas() {
    const term = this.searchTerm.toLowerCase().trim();
    const data = this.apiUniversities();

    return data
      .filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          (u.displayName && u.displayName.toLowerCase().includes(term)),
      )
      .map((u) => ({
        id: u.id,
        nombre: u.name,
        logo: this.resolveUniversityLogo(u),
        ciudad: 'Colombia',
        tipo: 'Institución Aliada',
        slug: u.landingConfig?.slug || u.slug,
        modalidades: u.aplicasede ? ['Presencial', 'Virtual'] : ['Virtual'],
      }));
  }
}
