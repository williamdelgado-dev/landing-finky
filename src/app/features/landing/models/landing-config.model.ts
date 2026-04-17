export interface OfertaAcademica {
  tipoPrograma: string;
  Nombre: string;
  valorSemestre: string;
}

export interface LandingConfig {
  plantilla: number;
  colores: {
    oscuro: string;
    claro: string;
  };
  nombreUniversidad?: string;
  idUniversidad?: string;
  iconUniversity?: string;
  banner: {
    pc: string;
    movil: string;
    titulo: string;
    contenido: string;
  };
  bullets: Array<{ titulo: string; desc: string }>;
  oferta: OfertaAcademica[];
  prompt_version?: string;
}

export interface ConfigApiResponse {
  status: boolean;
  message: string;
  data: LandingConfig;
}
