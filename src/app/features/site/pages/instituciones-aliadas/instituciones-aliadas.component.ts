import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortalHeaderComponent } from '@site/components/header/header.component';
import { PortalFooterComponent } from '@site/components/footer/footer.component';

interface Institucion {
  nombre: string;
  logo: string;
  ciudad: string;
  tipo: 'Universidad' | 'Corporación' | 'Institución' | 'Fundación';
  slug: string;
  modalidades: string[];
}

@Component({
  selector: 'app-instituciones-aliadas',
  standalone: true,
  imports: [CommonModule, RouterModule, PortalHeaderComponent, PortalFooterComponent],
  templateUrl: './instituciones-aliadas.component.html',
  styleUrl: './instituciones-aliadas.component.css',
})
export class InstitucionesAliadasComponent {
  filtroActivo: 'todas' | 'Universidad' | 'Corporación' | 'Institución' | 'Fundación' = 'todas';

  instituciones: Institucion[] = [
    {
      nombre: 'Areandina',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Areandina-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Universidad',
      slug: 'areandina-2',
      modalidades: ['Presencial', 'Virtual'],
    },
    {
      nombre: 'Universidad Cooperativa de Colombia',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Universidad-Cooperativa-de-Colombia-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Universidad',
      slug: 'instituciones/cooperativadecolombia',
      modalidades: ['Presencial', 'Virtual'],
    },
    {
      nombre: 'Ibero',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Ibero-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Corporación',
      slug: 'ibero',
      modalidades: ['Presencial', 'Virtual'],
    },
    {
      nombre: 'Universidad de América',
      logo: 'https://finky.la/wp-content/uploads/2026/02/Universidad-de-America-editado-Photoroom-1-e1771873378299.png',
      ciudad: 'Bogotá',
      tipo: 'Universidad',
      slug: 'universidad-de-america',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'San Buenaventura',
      logo: 'https://finky.la/wp-content/uploads/2025/11/San-Buenaventura-editado.png',
      ciudad: 'Medellín',
      tipo: 'Universidad',
      slug: 'universidad-san-buenaventura-medellin',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'La Salle',
      logo: 'https://finky.la/wp-content/uploads/2025/04/fondosalle.png',
      ciudad: 'Bogotá',
      tipo: 'Universidad',
      slug: 'la-salle',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Uninpahu',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Uninpahu-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Institución',
      slug: 'institucion-universitaria-uninpahu',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Unimeta',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Unimeta-editado.png',
      ciudad: 'Villavicencio',
      tipo: 'Universidad',
      slug: 'unimeta',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Juan N. Corpas',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Juan-N-Corpas-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Fundación',
      slug: 'fundacion-universitaria-juan-n-corpas',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Unipiloto',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Unipiloto-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Universidad',
      slug: 'universidad-piloto-de-colombia',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Universidad EAN',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Ean-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Universidad',
      slug: 'universidad-ean',
      modalidades: ['Presencial', 'Virtual'],
    },
    {
      nombre: 'San Mateo',
      logo: 'https://finky.la/wp-content/uploads/2025/11/San-Mateo-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Fundación',
      slug: 'fundacion-universitaria-san-mateo',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Edupol',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Edupol-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Institución',
      slug: 'edupol-2',
      modalidades: ['Virtual'],
    },
    {
      nombre: 'Salesiana',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Uni-Salesiana-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Universidad',
      slug: 'salesiana',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'UDCA',
      logo: 'https://finky.la/wp-content/uploads/2025/11/UDCA-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Universidad',
      slug: 'udca',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Teinco',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Teinco-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Institución',
      slug: 'teinco',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Unitec',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Unitec-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Corporación',
      slug: 'unitec',
      modalidades: ['Presencial', 'Virtual'],
    },
    {
      nombre: 'Escolme',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Escolme-editado.png',
      ciudad: 'Medellín',
      tipo: 'Institución',
      slug: 'escolme',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Comfamiliar',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Comfamiliar-editado.png',
      ciudad: 'Risaralda',
      tipo: 'Fundación',
      slug: 'comfamiliar',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Universidad de Colombia',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Universidad-de-Colombia-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Corporación',
      slug: 'corporacion-universitaria-u-de-colombia',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Alberto Merani',
      logo: 'https://finky.la/wp-content/uploads/2026/01/Diseno-sin-titulo-8-2.png',
      ciudad: 'Bogotá',
      tipo: 'Fundación',
      slug: 'fundacion-de-educacion-superior-alberto-merani',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Uniempresarial',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Uniempresarial-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Fundación',
      slug: 'uniempresarial',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'Unilatina',
      logo: 'https://finky.la/wp-content/uploads/2025/11/Unilatina-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Institución',
      slug: 'unilatina-2',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'CPN – Cristo para las Naciones',
      logo: 'https://finky.la/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-07-at-9.53.57-AM-1.webp',
      ciudad: 'Colombia',
      tipo: 'Fundación',
      slug: 'cpn-cristo-para-las-naciones-colombia',
      modalidades: ['Presencial'],
    },
    {
      nombre: 'San Alfonso',
      logo: 'https://finky.la/wp-content/uploads/2025/11/San-Alfonso-editado.png',
      ciudad: 'Bogotá',
      tipo: 'Fundación',
      slug: 'san-alfonso-2',
      modalidades: ['Presencial'],
    },
  ];

  tipos: { id: 'todas' | 'Universidad' | 'Corporación' | 'Institución' | 'Fundación'; label: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'Universidad', label: 'Universidades' },
    { id: 'Corporación', label: 'Corporaciones' },
    { id: 'Institución', label: 'Instituciones' },
    { id: 'Fundación', label: 'Fundaciones' },
  ];

  get institucionesFiltradas(): Institucion[] {
    if (this.filtroActivo === 'todas') return this.instituciones;
    return this.instituciones.filter((i) => i.tipo === this.filtroActivo);
  }

  countFor(id: 'todas' | 'Universidad' | 'Corporación' | 'Institución' | 'Fundación'): number {
    if (id === 'todas') return this.instituciones.length;
    return this.instituciones.filter((i) => i.tipo === id).length;
  }

  setFiltro(id: 'todas' | 'Universidad' | 'Corporación' | 'Institución' | 'Fundación') {
    this.filtroActivo = id;
  }
}
