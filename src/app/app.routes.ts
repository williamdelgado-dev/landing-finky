import { Routes } from '@angular/router';
import { LandingPageComponent } from '@institutional/pages/landing-page.component';
import { PortalHomeComponent } from '@site/pages/home/portal-home.component';
import { inject } from '@angular/core';
import { ConfigService } from '@institutional/services/config.service';
import { QueEsFinkyComponent } from '@site/pages/que-es-finky/que-es-finky.component';
import { PreguntasComponent } from '@site/pages/preguntas/preguntas.component';
import { InstitucionesAliadasComponent } from '@site/pages/instituciones-aliadas/instituciones-aliadas.component';

export const routes: Routes = [
  {
    path: '',
    canMatch: [() => !!inject(ConfigService).getSubdomain()],
    component: LandingPageComponent,
    title: 'Finky — Landing Institucional',
  },
  {
    path: '',
    component: PortalHomeComponent,
    pathMatch: 'full',
    title: 'Finky — Plataforma de Financiación Educativa',
  },
  {
    path: 'que-es-finky',
    component: QueEsFinkyComponent,
    pathMatch: 'full',
    title: 'Finky — ¿Qué es Finky?',
  },
  {
    path: 'preguntas',
    component: PreguntasComponent,
    pathMatch: 'full',
    title: 'Finky — Preguntas frecuentes',
  },
  {
    path: 'instituciones-aliadas',
    component: InstitucionesAliadasComponent,
    pathMatch: 'full',
    title: 'Finky — Instituciones Aliadas',
  },
  {
    path: ':slug',
    component: LandingPageComponent,
    title: 'Finky — Landing Institucional',
  },
];
