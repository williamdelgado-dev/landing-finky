export interface Universidad {
  id: number;
  nombre: string;
  logo: string;
  ciudad: string;
  modalidades: string[];
  slug?: string;
}

export interface Carrera {
  id: number;
  nombre: string;
  area: string;
  duracion: string;
  precio: string;
  universidades: number[];
}

export interface Area {
  nombre: string;
  icono: string;
  color: string;
}

export interface Testimonio {
  nombre: string;
  texto: string;
  imagen: string;
}

export interface Faq {
  pregunta: string;
  respuesta: string;
}
