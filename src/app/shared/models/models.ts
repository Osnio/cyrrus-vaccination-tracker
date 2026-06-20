export type Gender = "male" | "female";

export type VaccinationStatus = "up_to_date" | "upcoming" | "overdue";

export type RecordStatus = "applied" | "pending" | "overdue" | "upcoming";

export interface Child {
  id: string;
  name: string;
  photo: string;
  birthDate: string; // ISO
  gender: Gender;
}

export interface Vaccine {
  id: string;
  name: string;
  description: string;
  ageRecommendation: string;
  doses: number;
  campaignEligible: boolean;
  category: "obrigatoria" | "campanha" | "especial";
  benefits: string[];
}

export interface VaccineRecord {
  id: string;
  childId: string;
  vaccineId: string;
  doseNumber: number;
  applied: boolean;
  applicationDate?: string; // ISO
  dueDate: string; // ISO
  location?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  active: boolean;
  vaccineIds: string[];
  color: "primary" | "secondary" | "accent";
}

export interface ChildWithStatus extends Child {
  ageLabel: string;
  ageMonths: number;
  vaccinationStatus: VaccinationStatus;
  progressPercentage: number;
  appliedCount: number;
  pendingCount: number;
  overdueCount: number;
  totalCount: number;
}

// Tipos auxiliares usados no Dashboard
export interface FamilyMetrics {
  children: number;
  applied: number;
  pending: number;
  overdue: number;
  upcoming: number;
  activeCampaigns: number;
  totalProgress: number;
  childrenWithPendencies: number;
}

export interface FamilyHeadline {
  tone: "good" | "warn" | "bad";
  message: string;
}