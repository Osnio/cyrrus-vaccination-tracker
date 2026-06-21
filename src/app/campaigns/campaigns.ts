import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsCard, Campaign } from '../shared/component/campaigns-card/campaigns-card';
import { FilterToolbar } from '../shared/component/filter-toolbar/filter-toolbar';
import { PageHeader } from "../shared/component/page-header/page-header";

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, CampaignsCard, FilterToolbar, PageHeader],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.css',
})
export class Campaigns {
  searchTerm: string = '';
  activeFilter: string = 'Todas';

  campaigns: Campaign[] = [
    // ATIVAS
    {
      id: 1,
      titulo: "Campanha Nacional de Vacinação contra a Gripe 2026",
      descricao: "Imunização gratuita contra os subtipos circulantes do vírus Influenza, com foco em crianças de 6 meses a 6 anos.",
      publico: "Crianças de 6 meses a 6 anos",
      periodo: "10 jun — 09 ago 26",
      status: "Ativa"
    },
    {
      id: 2,
      titulo: "Dia D Multivacinação - Poliomielite",
      descricao: "Atualização da caderneta de vacinação com foco em poliomielite e demais vacinas pendentes da rotina infantil.",
      publico: "Crianças menores de 5 anos",
      periodo: "17 jun — 15 jul 26",
      status: "Ativa"
    },
    {
      id: 3,
      titulo: "Programa HPV Adolescentes",
      descricao: "Campanha de prevenção ao HPV com foco em adolescentes de 9 a 14 anos, conforme PNI.",
      publico: "Crianças e adolescentes 9-14 anos",
      periodo: "21 mai — 18 set 26",
      status: "Ativa"
    },

    // FUTURAS
    {
      id: 4,
      titulo: "Campanha de Sarampo e Rubéola 2026",
      descricao: "Reforço nacional contra sarampo e rubéola para proteger as crianças que ainda não completaram o esquema vacinal.",
      publico: "Crianças de 6 meses a 15 anos",
      periodo: "01 set — 30 out 26",
      status: "Futura"
    },
    {
      id: 5,
      titulo: "Vacinação contra Dengue - Fase 2",
      descricao: "Ampliação da vacinação contra dengue para mais faixas etárias em regiões endêmicas.",
      publico: "Crianças e adolescentes de 6 a 16 anos",
      periodo: "15 ago — 10 nov 26",
      status: "Futura"
    },

    // ENCERRADAS
    {
      id: 6,
      titulo: "Campanha de Febre Amarela 2025",
      descricao: "Campanha de vacinação contra febre amarela realizada no ano anterior.",
      publico: "Crianças acima de 9 meses",
      periodo: "10 jan — 20 mar 26",
      status: "Encerrada"
    },
    {
      id: 7,
      titulo: "Multivacinação de Inverno 2025",
      descricao: "Reforço geral de vacinas durante o período de inverno.",
      publico: "Crianças de 0 a 10 anos",
      periodo: "05 abr — 20 mai 26",
      status: "Encerrada"
    }
  ];
  get filters() {
    return [
      {
        label: `Todas (${this.campaigns.length})`,
        value: 'Todas'
      },
      {
        label: `Ativas (${this.campaigns.filter(c => c.status === 'Ativa').length})`,
        value: 'Ativa'
      },
      {
        label: `Futuras (${this.campaigns.filter(c => c.status === 'Futura').length})`,
        value: 'Futura'
      },
      {
        label: `Encerradas (${this.campaigns.filter(c => c.status === 'Encerrada').length})`,
        value: 'Encerrada'
      }
    ];
  }

  // Mapeamento para corrigir plural x singular
  private statusMap: { [key: string]: string } = {
    'Ativas': 'Ativa',
    'Futuras': 'Futura',
    'Encerradas': 'Encerrada',
    'Todas': 'Todas'
  };

  get filteredCampaigns(): Campaign[] {
    let result = [...this.campaigns];

    // Pesquisa
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();

      result = result.filter(c =>
        c.titulo.toLowerCase().includes(term) ||
        c.descricao.toLowerCase().includes(term) ||
        c.publico.toLowerCase().includes(term)
      );
    }

    // Filtro
    if (this.activeFilter !== 'Todas') {
      result = result.filter(c => c.status === this.activeFilter);
    }

    return result;
  }
  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
  }

  getCount(filter: string): number {
    if (filter === 'Todas') return this.campaigns.length;

    const statusToCount = this.statusMap[filter];
    return this.campaigns.filter(c => c.status === statusToCount).length;
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'Ativa': return 'ativa';
      case 'Futura': return 'futura';
      case 'Encerrada': return 'encerrada';
      default: return '';
    }
  }
}