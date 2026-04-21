import { Universidad, Carrera, Testimonio, Faq } from '@site/models/models';

export const universidades: Universidad[] = [
  {
    id: 1,
    nombre: 'Universidad Areandina',
    logo: '/assets/images/universities/areandina.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial', 'Virtual'],
  },
  {
    id: 2,
    nombre: 'Universidad Cooperativa de Colombia',
    logo: '/assets/images/universities/ucc.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial', 'Virtual'],
  },
  {
    id: 3,
    nombre: 'Corporación Universitaria Iberoamericana',
    logo: '/assets/images/universities/ibero.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial', 'Virtual'],
  },
  {
    id: 4,
    nombre: 'Universidad San Buenaventura',
    logo: '/assets/images/universities/san-buenaventura.png',
    ciudad: 'Medellín',
    modalidades: ['Presencial'],
  },
  {
    id: 5,
    nombre: 'Fundación Universitaria Juan N. Corpas',
    logo: '/assets/images/universities/juan-n-corpas.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial'],
  },
  {
    id: 6,
    nombre: 'Universidad Piloto de Colombia',
    logo: '/assets/images/universities/unipiloto.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial'],
  },
  {
    id: 7,
    nombre: 'Universidad EAN',
    logo: '/assets/images/universities/ean.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial', 'Virtual'],
  },
  {
    id: 8,
    nombre: 'Fundación Universitaria San Mateo',
    logo: '/assets/images/universities/san-mateo.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial'],
  },
  {
    id: 9,
    nombre: 'UDCA',
    logo: '/assets/images/universities/udca.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial'],
  },
  {
    id: 10,
    nombre: 'Unitec',
    logo: '/assets/images/universities/unitec.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial', 'Virtual'],
  },
  {
    id: 11,
    nombre: 'Universidad de América',
    logo: '/assets/images/universities/universidad-de-america.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial'],
  },
  {
    id: 12,
    nombre: 'Unilatina',
    logo: '/assets/images/universities/unilatina.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial'],
  },
  {
    id: 13,
    nombre: 'Universidad Salesiana',
    logo: '/assets/images/universities/salesiana.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial'],
  },
  {
    id: 14,
    nombre: 'Uninpahu',
    logo: '/assets/images/universities/uninpahu.png',
    ciudad: 'Bogotá',
    modalidades: ['Presencial'],
  },
  {
    id: 15,
    nombre: 'Unimeta',
    logo: '/assets/images/universities/unimeta.png',
    ciudad: 'Villavicencio',
    modalidades: ['Presencial'],
  },
];

export const carreras: Carrera[] = [
  {
    id: 1,
    nombre: 'Ingeniería de Sistemas',
    area: 'Ingenierías',
    duracion: '10 semestres',
    precio: '4.500.000',
    universidades: [1, 2, 6, 7, 10],
  },
  {
    id: 2,
    nombre: 'Administración de Empresas',
    area: 'Economía y Negocios',
    duracion: '8 semestres',
    precio: '4.200.000',
    universidades: [1, 2, 3, 7, 8, 12],
  },
  {
    id: 3,
    nombre: 'Psicología',
    area: 'Ciencias Sociales',
    duracion: '10 semestres',
    precio: '4.800.000',
    universidades: [2, 3, 4],
  },
  {
    id: 4,
    nombre: 'Derecho',
    area: 'Derecho',
    duracion: '10 semestres',
    precio: '5.200.000',
    universidades: [2, 4, 11],
  },
  {
    id: 5,
    nombre: 'Medicina',
    area: 'Ciencias de la Salud',
    duracion: '12 semestres',
    precio: '12.000.000',
    universidades: [5],
  },
  {
    id: 6,
    nombre: 'Enfermería',
    area: 'Ciencias de la Salud',
    duracion: '8 semestres',
    precio: '4.000.000',
    universidades: [3, 5, 9],
  },
  {
    id: 7,
    nombre: 'Contaduría Pública',
    area: 'Economía y Negocios',
    duracion: '10 semestres',
    precio: '3.800.000',
    universidades: [1, 2, 7, 8, 12, 13],
  },
  {
    id: 8,
    nombre: 'Ingeniería Civil',
    area: 'Ingenierías',
    duracion: '10 semestres',
    precio: '5.500.000',
    universidades: [6, 11],
  },
  {
    id: 9,
    nombre: 'Diseño Gráfico',
    area: 'Artes y Humanidades',
    duracion: '8 semestres',
    precio: '4.100.000',
    universidades: [3, 8, 10, 14],
  },
  {
    id: 10,
    nombre: 'Comunicación Social',
    area: 'Ciencias Sociales',
    duracion: '8 semestres',
    precio: '4.300.000',
    universidades: [2, 4, 12],
  },
  {
    id: 11,
    nombre: 'Ingeniería Industrial',
    area: 'Ingenierías',
    duracion: '10 semestres',
    precio: '5.000.000',
    universidades: [1, 6, 7, 11],
  },
  {
    id: 12,
    nombre: 'Medicina Veterinaria',
    area: 'Ciencias de la Salud',
    duracion: '10 semestres',
    precio: '6.500.000',
    universidades: [9],
  },
  {
    id: 13,
    nombre: 'Arquitectura',
    area: 'Artes y Humanidades',
    duracion: '10 semestres',
    precio: '5.800.000',
    universidades: [6, 11],
  },
  {
    id: 14,
    nombre: 'Marketing',
    area: 'Economía y Negocios',
    duracion: '8 semestres',
    precio: '4.000.000',
    universidades: [3, 7, 10, 14],
  },
  {
    id: 15,
    nombre: 'Trabajo Social',
    area: 'Ciencias Sociales',
    duracion: '8 semestres',
    precio: '3.500.000',
    universidades: [2, 4, 15],
  },
];

export const testimonios: Testimonio[] = [
  {
    nombre: 'Karol Mendivelso',
    texto:
      'Finky me ayudó a empezar mi carrera sin tener que buscar un codeudor. Fue todo súper fácil y rápido',
    imagen: '/assets/images/testimonials/karol.png',
  },
  {
    nombre: 'Jairo José Perez',
    texto:
      'Me sorprendió lo rápido que fue. En menos de una semana ya estaba matriculado con el crédito aprobado.',
    imagen: '/assets/images/testimonials/jairo.jpg',
  },
  {
    nombre: 'Lina Marcela Hernández',
    texto:
      'Lo mejor es que no me pidieron codeudor. Con Finky pude empezar mi carrera sin depender de nadie más',
    imagen: '/assets/images/testimonials/lina.jpg',
  },
];

export const faqs: Faq[] = [
  {
    pregunta: '¿Cómo funciona Finky?',
    respuesta:
      'Finky te permite financiar tu semestre universitario sin necesidad de codeudor ni historial crediticio. Simulas tu crédito, te registras, y en 5 minutos tienes respuesta.',
  },
  {
    pregunta: '¿Cuánto cobra Finky?',
    respuesta:
      'El cobro de Finky varía según la institución educativa y el programa académico. Este valor está incluido en tus cuotas mensuales y cubre el proceso operativo del crédito.',
  },
  {
    pregunta: '¿En cuántas cuotas debo pagar?',
    respuesta:
      'Puedes pagar tu semestre en hasta 6 cuotas mensuales. La cantidad debe ser máximo el número de meses que dura tu periodo académico.',
  },
  {
    pregunta: '¿Necesito codeudor?',
    respuesta:
      '¡No! En Finky no necesitas codeudor. Tú respondes por tu crédito, sin cargar a nadie más con tu decisión de estudiar.',
  },
];

export const tagsPopulares = [
  'Administración',
  'Ingeniería',
  'Psicología',
  'Derecho',
  'Medicina',
  'Contaduría',
];

export function getUniversidadesByCarrera(carrera: Carrera): Universidad[] {
  return universidades.filter((u) => carrera.universidades.includes(u.id));
}

export function formatCOP(value: number): string {
  return value.toLocaleString('es-CO');
}
