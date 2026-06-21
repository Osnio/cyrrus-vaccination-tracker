import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsCard, Metric } from '../shared/component/reports-card/reports-card';
import { PageHeader } from "../shared/component/page-header/page-header";

@Component({
  selector: 'app-reports-children',
  standalone: true,
  imports: [CommonModule, ReportsCard, PageHeader],
  templateUrl: './reports-children.html',
  styleUrl: './reports-children.css',
})
export class ReportsChildren {
  metrics: Metric[] = [
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

  familyData = {
    resumoFamilia: {
      coberturaGeral: "81%",
      totalAplicadas: 35,
      totalPendentes: 5,
      totalAtrasadas: 3,
      totalPrevisto: 43
    },
    criancas: [
      { nome: "Arthur", aplicadas: 10, pendentes: 1, atrasadas: 0, porcentagem: 91 },
      { nome: "Helena", aplicadas: 8, pendentes: 0, atrasadas: 0, porcentagem: 73 },
      { nome: "Laura", aplicadas: 5, pendentes: 3, atrasadas: 2, porcentagem: 63 },
      { nome: "Miguel", aplicadas: 8, pendentes: 3, atrasadas: 1, porcentagem: 100 },
      { nome: "Sofia", aplicadas: 4, pendentes: 1, atrasadas: 0, porcentagem: 80 }
    ]
  };
  getPercentage(value: number, child: any): number {
    const total = child.aplicadas + child.pendentes + child.atrasadas;
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  }
}