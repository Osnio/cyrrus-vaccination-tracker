export interface ChildSummary {
  nome: string;
  idade: string;
  porcentagem: number;
  status: string;
  detalhe: string;
}

export interface ProximaVacinacao {
  crianca: string;
  vacina: string;
  data: string;
  prazo: string;
}

export interface AlertaImportante {
  vacina: string;
  crianca: string;
  atrasoDias: number;
}

export interface UltimaAplicada {
  vacina: string;
  crianca: string;
  dose: string;
  data: string;
}

export interface CampanhaDestaque {
  titulo: string;
  publico: string;
  validade: string;
}

export interface FamilyMetrics {
  applied: number;
  pending: number;
  overdue: number;
  totalProgress: number;
}