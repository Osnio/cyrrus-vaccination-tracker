import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsCard, Campaign } from '../shared/components/campaigns-card/campaigns-card';
import { FilterToolbar } from '../shared/components/filter-toolbar/filter-toolbar';
import { PageHeader } from "../shared/components/page-header/page-header";
import { CAMPAIGNS_DATA } from '../mocks/ampaigns.data';
import { Pagination } from "../shared/components/pagination/pagination";

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, CampaignsCard, FilterToolbar, PageHeader, Pagination],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.css',
})
export class Campaigns {
  searchTerm: string = '';
  activeFilter: string = 'Todas';

  campaigns: Campaign[] = CAMPAIGNS_DATA;

  readonly PAGE_SIZE = 6;
  currentPage = 1;

  get filters() {
    return [
      { label: `Todas (${this.campaigns.length})`, value: 'Todas' },
      { label: `Ativas (${this.campaigns.filter(c => c.status === 'Ativa').length})`, value: 'Ativa' },
      { label: `Futuras (${this.campaigns.filter(c => c.status === 'Futura').length})`, value: 'Futura' },
      { label: `Encerradas (${this.campaigns.filter(c => c.status === 'Encerrada').length})`, value: 'Encerrada' }
    ];
  }

  private statusMap: { [key: string]: string } = {
    'Ativas': 'Ativa',
    'Futuras': 'Futura',
    'Encerradas': 'Encerrada',
    'Todas': 'Todas'
  };

  get filteredCampaigns(): Campaign[] {
    let result = [...this.campaigns];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(c =>
        c.titulo.toLowerCase().includes(term) ||
        c.descricao.toLowerCase().includes(term) ||
        c.publico.toLowerCase().includes(term)
      );
    }

    if (this.activeFilter !== 'Todas') {
      result = result.filter(c => c.status === this.activeFilter);
    }

    return result;
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
  }

  get pagedCampaigns() {
    const start = (this.currentPage - 1) * this.PAGE_SIZE;
    return this.filteredCampaigns.slice(
        start,
        start + this.PAGE_SIZE
    );

  }
}