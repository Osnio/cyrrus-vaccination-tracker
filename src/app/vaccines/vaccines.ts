import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VaccineCard } from "../shared/component/vaccine-card/vaccine-card";
import { PageHeader } from "../shared/component/page-header/page-header";
import { FilterToolbar } from "../shared/component/filter-toolbar/filter-toolbar";

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

  vaccines: Vaccine[] = [
    {
      nome: "BCG",
      periodo: "Ao nascer",
      isCampanha: false,
      descricao: "Protege contra formas graves da tuberculose, como a meningite tuberculosa.",
      doses: 1,
      beneficios: ["Previne tuberculose grave", "Dose única", "Imunidade duradoura"]
    },
    {
      nome: "Hepatite B",
      periodo: "Ao nascer, 2, 4 e 6 meses",
      isCampanha: false,
      descricao: "Imunização contra o vírus da Hepatite B, prevenindo cirrose e câncer de fígado.",
      doses: 4,
      beneficios: ["Proteção hepática", "Esquema completo na infância"]
    },
    {
      nome: "Pentavalente",
      periodo: "2, 4 e 6 meses",
      isCampanha: false,
      descricao: "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.",
      doses: 3,
      beneficios: ["5 em 1", "Reduz número de aplicações"]
    },
    {
      nome: "Poliomielite (VIP)",
      periodo: "2, 4 e 6 meses",
      isCampanha: true,
      descricao: "Vacina inativada poliomielite, protege contra a paralisia infantil.",
      doses: 3,
      beneficios: ["Erradicação da pólio", "Segura e eficaz"]
    },
    {
      nome: "Rotavírus",
      periodo: "2 e 4 meses",
      isCampanha: false,
      descricao: "Previne diarreias graves causadas pelo rotavírus em bebês.",
      doses: 2,
      beneficios: ["Evita desidratação grave", "Reduz internações"]
    },
    {
      nome: "Pneumocócica 10",
      periodo: "2, 4 meses e reforço aos 12 meses",
      isCampanha: false,
      descricao: "Protege contra pneumonia, otite e meningite por pneumococo.",
      doses: 3,
      beneficios: ["Reduz pneumonias graves", "Protege ouvido médio"]
    },
    {
      nome: "Meningocócica C",
      periodo: "3, 5 meses e reforço aos 12 meses",
      isCampanha: false,
      descricao: "Imuniza contra meningite meningocócica do tipo C.",
      doses: 3,
      beneficios: ["Previne meningite", "Reforço aos 12 meses"]
    },
    {
      nome: "Tríplice Viral",
      periodo: "12 meses",
      isCampanha: true,
      descricao: "Protege contra Sarampo, Caxumba e Rubéola.",
      doses: 2,
      beneficios: ["Proteção tripla", "Campanhas nacionais frequentes"]
    },
    {
      nome: "Febre Amarela",
      periodo: "9 meses",
      isCampanha: true,
      descricao: "Imunização contra o vírus da febre amarela, recomendada em todo território nacional.",
      doses: 1,
      beneficios: ["Dose única", "Validade prolongada"]
    },
    {
      nome: "Influenza",
      periodo: "A partir de 6 meses, anualmente",
      isCampanha: true,
      descricao: "Vacina anual contra os principais subtipos do vírus Influenza.",
      doses: 1,
      beneficios: ["Reduz hospitalizações", "Atualização anual"]
    }
  ];

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

  setFilter(filter: string) {
    this.activeFilter = filter;
  }
  onSearch() {
    // Apenas para forçar atualização (o getter já reage)
  }
  filters = [
    { label: 'Todas', value: 'Todas' },
    { label: 'Obrigatórias', value: 'Obrigatórias' },
    { label: 'Campanhas', value: 'Campanhas' },
    { label: 'Especiais', value: 'Especiais' }
  ];

  onSearchChange(term: string) {
    this.searchTerm = term;
    // O getter filteredVaccines já reage automaticamente
  }
}