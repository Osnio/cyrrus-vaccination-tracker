import { ChildSummary, ProximaVacinacao, AlertaImportante, UltimaAplicada, CampanhaDestaque, FamilyMetrics } from '../shared/models/dashboard.model';

export const FAMILY_METRICS: FamilyMetrics = {
  applied: 35,
  pending: 5,
  overdue: 3,
  totalProgress: 81
};

export const PROXIMAS_VACINACOES: ProximaVacinacao[] = [
  { crianca: "Laura Martins", vacina: "Influenza · Dose 1", data: "27 jun", prazo: "em 6 dias" },
  { crianca: "Sofia Martins", vacina: "Influenza · Dose 1", data: "02 jul", prazo: "em 11 dias" },
  { crianca: "Helena Martins", vacina: "Pentavalente · Dose 3", data: "04 jul", prazo: "em 13 dias" },
  { crianca: "Arthur Martins", vacina: "Influenza · Dose 1", data: "11 jul", prazo: "em 20 dias" },
  { crianca: "Helena Martins", vacina: "Meningocócica C · Dose 2", data: "18 jul", prazo: "em 27 dias" }
];

export const ALERTAS_IMPORTANTES: AlertaImportante[] = [
  { vacina: "Tríplice Viral", crianca: "Laura Martins", atrasoDias: 120 },
  { vacina: "Febre Amarela", crianca: "Laura Martins", atrasoDias: 45 },
  { vacina: "Pneumocócica 10", crianca: "Helena Martins", atrasoDias: 10 }
];

export const ULTIMAS_APLICADAS: UltimaAplicada[] = [
  { vacina: "Influenza", crianca: "Miguel Martins", dose: "Dose 1", data: "21 abr" },
  { vacina: "Rotavírus", crianca: "Helena Martins", dose: "Dose 2", data: "15 jul" },
  { vacina: "Pentavalente", crianca: "Helena Martins", dose: "Dose 2", data: "14 jul" },
  { vacina: "Meningocócica C", crianca: "Helena Martins", dose: "Dose 1", data: "13 jun" },
  { vacina: "Pneumocócica 10", crianca: "Helena Martins", dose: "Dose 1", data: "15 mai" }
];

export const CAMPANHAS_DESTAQUE: CampanhaDestaque[] = [
  { titulo: "Campanha Nacional de Vacinação contra a Gripe 2026", publico: "Crianças de 6 meses a 6 anos", validade: "ATÉ 09 AGO" },
  { titulo: "Dia D Multivacinação - Poliomielite", publico: "Crianças menores de 5 anos", validade: "ATÉ 15 JUL" },
  { titulo: "Programa HPV Adolescentes", publico: "Crianças e adolescentes 9-14 anos", validade: "ATÉ 18 SET" }
];

export const RESUMO_CRIANCAS: ChildSummary[] = [
  { nome: "Helena Martins", idade: "2 anos e 3m", porcentagem: 73, status: "Vacina", detalhe: "4 pendentes" },
  { nome: "Arthur Martins", idade: "3 anos", porcentagem: 91, status: "Próxima", detalhe: "1 pendente" },
  { nome: "Laura Martins", idade: "5 anos", porcentagem: 63, status: "Vacina", detalhe: "5 pendentes" },
  { nome: "Miguel Martins", idade: "8 anos", porcentagem: 100, status: "Em", detalhe: "Tudo em dia" },
  { nome: "Sofia Martins", idade: "10 anos", porcentagem: 80, status: "Próxima", detalhe: "1 pendente" }
];