export interface LandingConfig {
  plantilla: number;
  colores: {
    oscuro: string;
    claro: string;
  };
  nombreUniversidad?: string;
  banner: {
    pc: string;
    movil: string;
    titulo: string;
    contenido: string;
  };
  bullets: Array<{ titulo: string; desc: string }>;
  oferta: string[];
}
