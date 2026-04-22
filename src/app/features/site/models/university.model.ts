export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type UniversityResponse = ApiResponse<University>;
export type AcademicProgramResponse = ApiResponse<AcademicProgram>;

export interface University {
  id: number;
  name: string;
  contactFullName: string;
  contactPhone: string;
  contactEmail: string;
  enabled: boolean;
  minInstallments: number;
  maxInstallments: number;
  maxAmount: number;
  minAmount: number;
  bondPercentage: string | number | null;
  interestPercentage: string;
  finkyPercentage: string | number | null;
  finkyAmount: number;
  createdAt: string;
  updatedAt: string;
  administrativeCost: boolean;
  coophumanaContribution: number;
  comisionCoophumana: string;
  seguroPercentage: string;
  redondeoPercentage: string;
  datacreditValidation: number;
  adotechStudy: number;
  cost20mil: boolean;
  cxs: number;
  aplicasede: boolean;
  scoring_fia: number[];
  values: UniversityValues;
  displayName: string;
  academicProgram: AcademicProgram[];
  maxAmountString: string;
  minAmountString: string;
  finkyAmountString: string;
  coophumanaContributionString: string;
  slug: string | null;
  numeroProgramas?: number;
  landingConfig?: LandingConfig;
}

export interface LandingConfig {
  idUniversidad: string;
  plantilla: number;
  nombreUniversidad: string;
  slug: string;
  iconUniversity: string;
  colores: {
    claro: string;
    oscuro: string;
  };
  banner: {
    pc: string;
    titulo: string;
    contenido: string;
  };
  bullets: {
    titulo: string;
    desc: string;
  }[];
}

export interface UniversityValues {
  new: ValueDetail[];
  renovation: ValueDetail[];
}

export interface ValueDetail {
  name: string;
  identifier: string;
  percentage: number;
}

export interface AcademicProgram {
  id: number;
  name: string;
  semesters: number;
  semesterPrice: number;
  universityId: number;
  createdAt: string;
  updatedAt: string;
  state: number;
  programTypeId: number;
  programType: ProgramType;
  semesterPriceString: string;
}

export interface ProgramType {
  id: number;
  description: string;
}
