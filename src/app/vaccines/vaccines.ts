import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VaccineCard } from "../shared/component/vaccine-card/vaccine-card";
import { PageHeader } from "../shared/component/page-header/page-header";
import { FilterToolbar } from "../shared/component/filter-toolbar/filter-toolbar";
import { VACCINES_DATA } from '../mocks/vaccines.data';

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
  imports: [CommonModule, FormsModule, VaccineCard, PageHeader, FilterToolbar],
  templateUrl: './vaccines.html',
  styleUrl: './vaccines.css',
})
export class Vaccines {
  searchTerm: string = '';
  activeFilter: string = 'Todas';

  vaccines: Vaccine[] = VACCINES_DATA;

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
}