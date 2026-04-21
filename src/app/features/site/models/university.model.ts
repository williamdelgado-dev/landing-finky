export interface UniversityResponse {
  status: boolean;
  message: string;
  data: University[];
}

export interface University {
  id: number;
  name: string;
  contactFullName: string;
  contactPhone: string;
  contactEmail: string[];
  enabled: boolean;
  minInstallments: number;
  maxInstallments: number;
  maxAmount: number;
  minAmount: number;
  bondPercentage: string | null;
  interestPercentage: string;
  finkyPercentage: string | null;
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
