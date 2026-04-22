import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortalHeaderComponent } from '@site/components/header/header.component';
import { PortalFooterComponent } from '@site/components/footer/footer.component';

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

interface FaqCategoria {
  id: string;
  titulo: string;
  descripcion: string;
  preguntas: FaqItem[];
}

import { LinaPortalComponent } from '@site/components/lina-portal/lina-portal.component';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    PortalHeaderComponent, 
    PortalFooterComponent,
    LinaPortalComponent
  ],
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css',
})
export class PreguntasComponent {
  activeCategoria = 'general';
  openKey: string | null = 'general-0';

  categorias: FaqCategoria[] = [
    {
      id: 'general',
      titulo: 'Sobre Finky',
      descripcion: 'Qué es, cómo funciona y en qué se diferencia.',
      preguntas: [
        {
          pregunta: '¿Qué es Finky y cómo funciona?',
          respuesta:
            'Finky es una plataforma que te ayuda a financiar tu semestre en cuotas mensuales. Tú te registras, nosotros te aprobamos un crédito educativo para pagar el semestre de tu institución y luego tú nos pagas mes a mes.',
        },
        {
          pregunta: '¿Finky es una beca o un préstamo?',
          respuesta:
            'Finky no es una beca, es un crédito educativo. Pero a diferencia de los bancos, no pedimos codeudor ni historial, y puedes pagarlo durante el semestre.',
        },
        {
          pregunta: '¿Finky pide codeudor?',
          respuesta:
            'No. Con Finky no necesitas codeudor, te evaluamos directamente a ti. En caso de que el estudiante sea menor de edad, el proceso de solicitud debe realizarlo un adulto responsable (padres, familiar o acudiente).',
        },
        {
          pregunta: '¿Necesito tener historial crediticio?',
          respuesta:
            'No. En Finky puedes aplicar aunque no tengas historial o estés empezando desde cero. Aprobamos a 8 de cada 10 estudiantes.',
        },
      ],
    },
    {
      id: 'registro',
      titulo: 'Registro y aprobación',
      descripcion: 'Todo sobre el proceso para pedir tu crédito educativo.',
      preguntas: [
        {
          pregunta: '¿Qué necesito para registrarme?',
          respuesta:
            'Correo, número de celular y crear una contraseña. Luego te pediremos datos simples como dónde vives, cuánto pagas de arriendo, cuáles son tus gastos, cuáles tus ingresos y a qué institución vas. Es necesario contar con tu documento de identidad original en mano para realizar el proceso.',
        },
        {
          pregunta: '¿Cuánto tiempo tarda la aprobación?',
          respuesta:
            'La aprobación es rápida, en pocos minutos, y se realiza a través de nuestro scoring propio, que evalúa tu perfil de forma integral para darte una respuesta ágil y confiable.',
        },
        {
          pregunta: '¿Cómo calculo cuánto debo pagar al mes?',
          respuesta:
            'Usa nuestro simulador. Solo necesitas saber el valor de tu semestre y elegir en cuántas cuotas quieres pagarlo.',
        },
        {
          pregunta: '¿Si no tengo trabajo, puedo aplicar?',
          respuesta:
            'Sí, si tienes ingresos para poder cubrir las cuotas mensuales. Si no es el caso y alguien va a pagar por ti, recuerda que puedes hacerlo a través de un familiar o amigo.',
        },
        {
          pregunta: '¿Cómo es el proceso de formalización del crédito educativo?',
          respuesta:
            'Una vez te aprueban el crédito estudiantil, eliges si quieres terminar el proceso por WhatsApp o por la web. Allí firmas digitalmente y listo. Nosotros nos encargamos de comunicarle a tu institución para que tu matrícula quede registrada.',
        },
        {
          pregunta: '¿Cuánto tiempo tarda la formalización con la institución?',
          respuesta:
            'La formalización del crédito educativo es inmediata una vez el estudiante realiza el pago de la primera cuota y la institución confirma el registro. Esto permite activar tu matrícula sin demoras y continuar con el proceso académico.',
        },
      ],
    },
    {
      id: 'pagos',
      titulo: 'Cuotas y pagos',
      descripcion: 'Cómo pagas, plazos y beneficios.',
      preguntas: [
        {
          pregunta: '¿En cuántas cuotas debo pagar?',
          respuesta:
            'Puedes pagar tu semestre en hasta 6 cuotas mensuales. La cantidad debe ser máximo el número de meses que dura tu periodo académico.',
        },
        {
          pregunta: '¿Puedo pagar antes de tiempo?',
          respuesta:
            'Sí. Puedes adelantar cuotas o pagar el crédito completo cuando quieras, sin penalizaciones.',
        },
        {
          pregunta: '¿Qué pasa si me atraso en una cuota?',
          respuesta:
            'Te ayudamos con recordatorios y opciones de pago. Pero es importante pagar a tiempo para no perder beneficios ni acceso a la renovación automática.',
        },
      ],
    },
    {
      id: 'renovacion',
      titulo: 'Renovación',
      descripcion: 'Cómo sigues estudiando semestre a semestre.',
      preguntas: [
        {
          pregunta: '¿Puedo renovar el crédito educativo cada semestre?',
          respuesta:
            'Sí. El único requisito es haber pagado tu crédito educativo anterior. Si ya lo hiciste, puedes renovar tu crédito educativo y listo: no te hacemos ningún nuevo análisis.',
        },
        {
          pregunta: '¿Puedo usar Finky para programas técnicos o tecnológicos?',
          respuesta:
            '¡Claro! Financiamos desde diplomados, programas técnicos, pregrados, posgrados y maestrías.',
        },
      ],
    },
    {
      id: 'instituciones',
      titulo: 'Instituciones',
      descripcion: 'Instituciones y convenios.',
      preguntas: [
        {
          pregunta: '¿Qué instituciones tienen convenio con Finky?',
          respuesta:
            'Tenemos más de 25 aliados. Puedes buscarlas en nuestra sección de Instituciones aliadas. Si no ves la tuya, te contamos cómo puedes ayudarnos a llegar allá.',
        },
        {
          pregunta: '¿Puedo usar Finky si mi institución no tiene convenio?',
          respuesta:
            'Sí. Si tu institución aún no tiene convenio, puedes dejarnos tus datos y, si hay suficientes interesados, hablaremos con ellos para abrir el convenio.',
        },
      ],
    },
  ];

  get categoriaActiva(): FaqCategoria {
    return this.categorias.find((c) => c.id === this.activeCategoria) ?? this.categorias[0];
  }

  selectCategoria(id: string) {
    this.activeCategoria = id;
    this.openKey = `${id}-0`;
  }

  toggle(key: string) {
    this.openKey = this.openKey === key ? null : key;
  }
}
