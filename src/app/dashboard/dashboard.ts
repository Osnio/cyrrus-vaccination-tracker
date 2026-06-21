import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { VaccinationService } from '../services/vaccination.service';
import { ReportsCard } from '../shared/component/reports-card/reports-card';
import { Metric } from "../shared/models/child-detail.model";
import { ChildProgressCard } from '../shared/component/child-progress-card/child-progress-card';
import { PageHeader } from "../shared/component/page-header/page-header";
import { PROXIMAS_VACINACOES, ALERTAS_IMPORTANTES, ULTIMAS_APLICADAS, CAMPANHAS_DESTAQUE, RESUMO_CRIANCAS } from '../mocks/dashboard.data';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterLink,
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
    { title: "COBERTURA GERAL", value: "81%", subtitle: "Família", icon: "bi bi-people", color: "#ABC270" },
    { title: "VACINAS APLICADAS", value: 35, subtitle: "Total acumulado", icon: "bi bi-check-circle", color: "#ABC270" },
    { title: "NO PRAZO", value: 5, subtitle: "Próximas recomendadas", icon: "bi bi-calendar-check", color: "#FEC868" },
    { title: "ATRASADAS", value: 3, subtitle: "Requer atenção imediata", icon: "bi bi-exclamation-triangle", color: "#FDA769" },
    { title: "CRIANÇAS EM DIA", value: "1", subtitle: "Miguel", icon: "bi bi-shield-check", color: "#ABC270" }
  ];

  metrics = this.vaccinationService.familyMetrics();
  childrenList = this.vaccinationService.getChildrenWithStatus();
  upcoming = this.vaccinationService.upcomingRecords(5);
  overdue = this.vaccinationService.overdueRecords();
  recent = this.vaccinationService.recentApplied(5);
  campaigns = this.vaccinationService.getActiveCampaigns();
  headline = this.vaccinationService.familyHeadline();

  pieData = [
    { name: 'Aplicadas', value: this.metrics.applied, color: 'var(--primary)' },
    { name: 'Pendentes', value: this.metrics.pending, color: 'var(--secondary)' },
    { name: 'Atrasadas', value: this.metrics.overdue, color: 'var(--accent)' },
  ];

  proximasVacinacoes = PROXIMAS_VACINACOES;
  alertasImportantes = ALERTAS_IMPORTANTES;
  ultimasAplicadas = ULTIMAS_APLICADAS;
  campanhasDestaque = CAMPANHAS_DESTAQUE;
  resumoCriancas = RESUMO_CRIANCAS;

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
