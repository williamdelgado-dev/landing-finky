import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { LandingConfig } from '@institutional/models/landing-config.model';

/**
 * Dev-only fallback. Como el API real (api-production.finky.la) no expone datos
 * en preview/local, este interceptor devuelve directamente un mock para que el
 * rediseño "Minimalismo Premium" sea verificable visualmente.
 * NO se ejecuta en producción — sólo se registra cuando environment.production === false.
 */

const finkyOrange = '#f16c2d';
const deepNavy = '#0f172a';

const baseOferta = [
  { tipoPrograma: 'Pregrado', Nombre: 'Administración de Empresas', valorSemestre: '$ 4.500.000' },
  { tipoPrograma: 'Pregrado', Nombre: 'Ingeniería de Sistemas', valorSemestre: '$ 5.200.000' },
  { tipoPrograma: 'Pregrado', Nombre: 'Psicología', valorSemestre: '$ 4.800.000' },
  { tipoPrograma: 'Pregrado', Nombre: 'Derecho', valorSemestre: '$ 5.100.000' },
  { tipoPrograma: 'Pregrado', Nombre: 'Comunicación Social', valorSemestre: '$ 4.300.000' },
  { tipoPrograma: 'Posgrado', Nombre: 'MBA Ejecutivo', valorSemestre: '$ 8.900.000' },
  { tipoPrograma: 'Posgrado', Nombre: 'Especialización en Finanzas', valorSemestre: '$ 7.200.000' },
  { tipoPrograma: 'Posgrado', Nombre: 'Maestría en Marketing Digital', valorSemestre: '$ 7.800.000' },
  { tipoPrograma: 'Técnico', Nombre: 'Técnico en Marketing Digital', valorSemestre: '$ 2.800.000' },
  { tipoPrograma: 'Técnico', Nombre: 'Técnico en Desarrollo Web', valorSemestre: '$ 2.950.000' },
  {
    tipoPrograma: 'Educación Continua',
    Nombre: 'Diplomado en Liderazgo Estratégico',
    valorSemestre: '$ 1.900.000',
  },
];

const baseBullets = [
  { titulo: '4 minutos', desc: 'Aprobación express, 100% online y sin filas.' },
  { titulo: 'Sin codeudor', desc: 'Tú respondes por tu crédito. Nadie más cargado.' },
  { titulo: '+15 IES', desc: 'Universidades aliadas en toda Colombia.' },
  { titulo: '6 cuotas', desc: 'Paga tu semestre en cuotas mensuales cómodas.' },
];

const mocks: Record<string, LandingConfig> = {
  demo: {
    plantilla: 1,
    colores: { oscuro: deepNavy, claro: finkyOrange },
    nombreUniversidad: 'Universidad Demo Finky',
    idUniversidad: '1',
    iconUniversity: '/assets/images/universities/areandina.png',
    banner: {
      pc: '/assets/images/iberoFondo.jpg',
      movil: '/assets/images/iberoFondo.jpg',
      titulo: 'Estudia hoy. Paga a tu ritmo.',
      contenido:
        'Financia tu semestre sin codeudor, sin papeleo y con respuesta en minutos. Tu carrera no puede esperar.',
    },
    bullets: baseBullets,
    oferta: baseOferta,
    prompt_version: 'finky',
  },
  areandina: {
    plantilla: 1,
    colores: { oscuro: deepNavy, claro: finkyOrange },
    nombreUniversidad: 'Universidad Areandina',
    idUniversidad: '2',
    iconUniversity: '/assets/images/universities/areandina.png',
    banner: {
      pc: '/assets/images/iberoFondo.jpg',
      movil: '/assets/images/iberoFondo.jpg',
      titulo: 'Tu futuro profesional empieza aquí.',
      contenido:
        'Financia tu semestre en Areandina con Finky. Sin codeudor, sin trámites engorrosos, todo en línea.',
    },
    bullets: baseBullets,
    oferta: baseOferta,
    prompt_version: 'finky',
  },
  ibero: {
    plantilla: 2,
    colores: { oscuro: deepNavy, claro: finkyOrange },
    nombreUniversidad: 'Corporación Universitaria Iberoamericana',
    idUniversidad: '3',
    iconUniversity: '/assets/images/universities/ibero.png',
    banner: {
      pc: '/assets/images/iberoFondo.jpg',
      movil: '/assets/images/iberoFondo.jpg',
      titulo: 'Una nueva forma de financiar tu carrera.',
      contenido:
        'Pensado para estudiantes Ibero. Aprobación en minutos, sin codeudor, sin historial crediticio.',
    },
    bullets: baseBullets,
    oferta: baseOferta,
    prompt_version: 'finky',
  },
  salle: {
    plantilla: 3,
    colores: { oscuro: deepNavy, claro: finkyOrange },
    nombreUniversidad: 'Universidad de La Salle',
    idUniversidad: '4',
    iconUniversity: '/assets/images/universities/san-buenaventura.png',
    banner: {
      pc: '/assets/images/fondosalle.png',
      movil: '/assets/images/fondosalle.png',
      titulo: 'Educación que transforma. Financiación que acompaña.',
      contenido:
        'En alianza con La Salle, Finky te ayuda a estudiar lo que quieras, sin codeudor, sin esperas.',
    },
    bullets: baseBullets.slice(0, 3),
    oferta: baseOferta,
    prompt_version: 'finky',
  },
};

export const mockConfigInterceptor: HttpInterceptorFn = (req, next) => {
  const isConfigEndpoint = req.url.includes('/portal-legalizaciones/ies-landing-config/search');
  if (!isConfigEndpoint) return next(req);

  let slug = '';
  try {
    const u = new URL(req.url, window.location.origin);
    slug = (u.searchParams.get('slug') || '').toLowerCase();
  } catch {
    slug = '';
  }

  const data = mocks[slug] || mocks['demo'];
  // eslint-disable-next-line no-console
  console.info('[MockConfig] devolviendo mock para slug =', slug || '(default demo)');

  return of(
    new HttpResponse({
      status: 200,
      body: { status: true, message: 'mock', data },
    }),
  );
};
