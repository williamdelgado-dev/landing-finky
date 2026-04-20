import { Routes } from '@angular/router';
import { LandingPageComponent } from '@institutional/pages/landing-page.component';
import { PortalHomeComponent } from '@site/pages/home/portal-home.component';
import { inject } from '@angular/core';
import { ConfigService } from '@institutional/services/config.service';
import { QueEsFinkyComponent } from '@site/pages/que-es-finky/que-es-finky.component';

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
    path: ':slug',
    component: LandingPageComponent,
    title: 'Finky — Landing Institucional',
  },
];
