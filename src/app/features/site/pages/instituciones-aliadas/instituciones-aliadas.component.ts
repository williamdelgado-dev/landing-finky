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

  get institucionesFiltradas() {
    const term = this.searchTerm.toLowerCase().trim();
    const data = this.apiUniversities();

    return data
      .filter((u) => u.name.toLowerCase().includes(term) || (u.displayName && u.displayName.toLowerCase().includes(term)))
      .map((u) => ({
        id: u.id,
        nombre: u.name,
        logo: u.landingConfig?.iconUniversity 
          ? `https://portal-legalizaciones.s3.us-east-1.amazonaws.com/${u.landingConfig.iconUniversity}`
          : '/assets/images/finkylogo.jpg',
        ciudad: 'Colombia',
        tipo: 'Institución Aliada',
        slug: u.landingConfig?.slug || u.slug,
        modalidades: u.aplicasede ? ['Presencial', 'Virtual'] : ['Virtual'],
      }));
  }
}
