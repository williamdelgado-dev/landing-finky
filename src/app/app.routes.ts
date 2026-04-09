import { Routes } from '@angular/router';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { LandingPageComponent } from './features/landing/pages/landing-page.component';
import { inject } from '@angular/core';
import { ConfigService } from './features/landing/services/config.service';

export const routes: Routes = [
  {
    path: '',
    canMatch: [() => !!inject(ConfigService).getSubdomain()],
    component: LandingPageComponent,
    title: 'Finky — Landing Institucional'
  },
  {
    path: '',
    component: UnderConstructionComponent,
    pathMatch: 'full',
    title: 'Finky — Plataforma de Financiación Educativa'
  },
  {
    path: ':slug',
    component: LandingPageComponent,
    title: 'Finky — Landing Institucional'
  }
];
