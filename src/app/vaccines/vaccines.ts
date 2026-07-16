import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VaccineCard } from "../shared/components/vaccine-card/vaccine-card";
import { PageHeader } from "../shared/components/page-header/page-header";
import { FilterToolbar } from "../shared/components/filter-toolbar/filter-toolbar";
import { VACCINES_DATA } from '../mocks/vaccines.data';
import { Pagination } from "../shared/components/pagination/pagination";

export interface Vaccine {
  nome: string;
  periodo: string;
  isCampanha: boolean;
  descricao: string;
  doses: number;
  beneficios: string[];
}

@Component({
  selector: 'app-vaccines',
  standalone: true,          // ← Adicione isso
  imports: [CommonModule, FormsModule, VaccineCard, PageHeader, FilterToolbar, Pagination],
  templateUrl: './vaccines.html',
  styleUrl: './vaccines.css',
})
export class Vaccines {
  searchTerm: string = '';
  activeFilter: string = 'Todas';

  vaccines: Vaccine[] = VACCINES_DATA;

  readonly PAGE_SIZE = 6;
  currentPage = 1;

  get filters() {
    return [
      { label: 'Todas', value: 'Todas' },
      { label: 'Obrigatórias', value: 'Obrigatórias' },
      { label: 'Campanhas', value: 'Campanhas' },
      { label: 'Especiais', value: 'Especiais' }
    ];
  }

  get filteredVaccines(): Vaccine[] {
    let result = [...this.vaccines];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(v => 
        v.nome.toLowerCase().includes(term) || 
        v.descricao.toLowerCase().includes(term)
      );
    }

    if (this.activeFilter === 'Obrigatórias') {
      result = result.filter(v => !v.isCampanha);
    } else if (this.activeFilter === 'Campanhas') {
      result = result.filter(v => v.isCampanha);
    } else if (this.activeFilter === 'Especiais') {
      result = result.filter(v => v.doses > 3);
    }

    return result;
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
  }

  get pagedVaccines() {
    const start = (this.currentPage - 1) * this.PAGE_SIZE;
    return this.filteredVaccines.slice(
      start,
      start + this.PAGE_SIZE
    );
  }
}