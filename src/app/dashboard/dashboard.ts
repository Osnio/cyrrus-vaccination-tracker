import { ProgressRing } from './../shared/component/progress-ring/progress-ring';
import { ProgressBar } from './../shared/component/progress-bar/progress-bar';
import { StatusBadge } from './../shared/component/status-badge/status-badge';
import { SectionHeading } from './../shared/component/section-heading/section-heading';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppLayout } from '../shared/component/app-layout/app-layout';
import { StatCard } from '../shared/component/stat-card/stat-card';

import { VaccinationService } from '../services/vaccination.service';
import { Metric, ReportsCard } from "../shared/component/reports-card/reports-card";
import { ChildProgressCard } from '../shared/component/child-progress-card/child-progress-card';
import { PageHeader } from "../shared/component/page-header/page-header";


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterLink,
    ProgressBar,
    ReportsCard,
    ChildProgressCard,
    PageHeader
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private vaccinationService = inject(VaccinationService);

  metricas: Metric[] = [
    {
      title: "COBERTURA GERAL",
      value: "81%",
      subtitle: "Família",
      icon: "bi bi-people",
      color: "#ABC270"
    },
    {
      title: "VACINAS APLICADAS",
      value: 35,
      subtitle: "Total acumulado",
      icon: "bi bi-check-circle",
      color: "#ABC270"
    },
    {
      title: "NO PRAZO",
      value: 5,
      subtitle: "Próximas recomendadas",
      icon: "bi bi-calendar-check",
      color: "#FEC868"
    },
    {
      title: "ATRASADAS",
      value: 3,
      subtitle: "Requer atenção imediata",
      icon: "bi bi-exclamation-triangle",
      color: "#FDA769"
    },

    {
      title: "CRIANÇAS EM DIA",
      value: "1",
      subtitle: "Miguel",
      icon: "bi bi-shield-check",
      color: "#ABC270"
    }
  ];

  metrics = this.vaccinationService.familyMetrics();
  childrenList = this.vaccinationService.getChildrenWithStatus();
  upcoming = this.vaccinationService.upcomingRecords(5);
  overdue = this.vaccinationService.overdueRecords();
  recent = this.vaccinationService.recentApplied(5);
  campaigns = this.vaccinationService.getActiveCampaigns();
  headline = this.vaccinationService.familyHeadline();

  pieData = [
    { name: 'Aplicadas', value: this.metrics.applied, color: 'var(--color-primary)' },
    { name: 'Pendentes', value: this.metrics.pending, color: 'var(--color-secondary)' },
    { name: 'Atrasadas', value: this.metrics.overdue, color: 'var(--color-accent)' },
  ];
  // Adicione estas propriedades com os dados mock:
  proximasVacinacoes = [
    { crianca: "Laura Martins", vacina: "Influenza · Dose 1", data: "27 jun", prazo: "em 6 dias" },
    { crianca: "Sofia Martins", vacina: "Influenza · Dose 1", data: "02 jul", prazo: "em 11 dias" },
    { crianca: "Helena Martins", vacina: "Pentavalente · Dose 3", data: "04 jul", prazo: "em 13 dias" },
    { crianca: "Arthur Martins", vacina: "Influenza · Dose 1", data: "11 jul", prazo: "em 20 dias" },
    { crianca: "Helena Martins", vacina: "Meningocócica C · Dose 2", data: "18 jul", prazo: "em 27 dias" }
  ];

  alertasImportantes = [
    { vacina: "Tríplice Viral", crianca: "Laura Martins", atrasoDias: 120 },
    { vacina: "Febre Amarela", crianca: "Laura Martins", atrasoDias: 45 },
    { vacina: "Pneumocócica 10", crianca: "Helena Martins", atrasoDias: 10 }
  ];

  ultimasAplicadas = [
    { vacina: "Influenza", crianca: "Miguel Martins", dose: "Dose 1", data: "21 abr" },
    { vacina: "Rotavírus", crianca: "Helena Martins", dose: "Dose 2", data: "15 jul" },
    { vacina: "Pentavalente", crianca: "Helena Martins", dose: "Dose 2", data: "14 jul" },
    { vacina: "Meningocócica C", crianca: "Helena Martins", dose: "Dose 1", data: "13 jun" },
    { vacina: "Pneumocócica 10", crianca: "Helena Martins", dose: "Dose 1", data: "15 mai" }
  ];

  campanhasDestaque = [
    { titulo: "Campanha Nacional de Vacinação contra a Gripe 2026", publico: "Crianças de 6 meses a 6 anos", validade: "ATÉ 09 AGO" },
    { titulo: "Dia D Multivacinação - Poliomielite", publico: "Crianças menores de 5 anos", validade: "ATÉ 15 JUL" },
    { titulo: "Programa HPV Adolescentes", publico: "Crianças e adolescentes 9-14 anos", validade: "ATÉ 18 SET" }
  ];

  resumoCriancas = [
    { nome: "Helena Martins", idade: "2 anos e 3m", porcentagem: 73, status: "Vacina", detalhe: "4 pendentes" },
    { nome: "Arthur Martins", idade: "3 anos", porcentagem: 91, status: "Próxima", detalhe: "1 pendente" },
    { nome: "Laura Martins", idade: "5 anos", porcentagem: 63, status: "Vacina", detalhe: "5 pendentes" },
    { nome: "Miguel Martins", idade: "8 anos", porcentagem: 100, status: "Em", detalhe: "Tudo em dia" },
    { nome: "Sofia Martins", idade: "10 anos", porcentagem: 80, status: "Próxima", detalhe: "1 pendente" }
  ];

  radialData = [{ name: 'Família', value: this.metrics.totalProgress, fill: 'var(--color-primary)' }];

  // Placeholder para gráficos Recharts
  getRadialProgress(): number {
    return this.metrics.totalProgress;
  }
  getInitials(nomeCompleto: string): string {
  if (!nomeCompleto) return '?';
  
  const nomes = nomeCompleto.trim().split(' ');
  if (nomes.length === 1) {
    return nomes[0].substring(0, 2).toUpperCase();
  }
  
  return (nomes[0][0] + nomes[nomes.length - 1][0]).toUpperCase();
}
}
