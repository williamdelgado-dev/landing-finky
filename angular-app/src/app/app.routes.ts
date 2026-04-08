import { Routes } from '@angular/router';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { LandingPageComponent } from './features/landing/pages/landing-page.component';

export const routes: Routes = [
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
