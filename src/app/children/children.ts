import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildCard } from "../shared/component/child-card/child-card";
import { PageHeader } from "../shared/component/page-header/page-header";
import { FilterToolbar } from "../shared/component/filter-toolbar/filter-toolbar";

export interface Child {
  id: string;
  name: string;
  age: string;
  status: 'Em dia' | 'Próxima vacinação' | 'Vacina atrasada';
  progress: number;
  applied: number;
  pending: number;
  overdue: number;
}

@Component({
  selector: 'app-children',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildCard, PageHeader, FilterToolbar],
  templateUrl: './children.html',
  styleUrl: './children.css',
})
export class Children {
  children: Child[] = [
    { id: '1', name: 'Arthur Martins', age: '3 anos', status: 'Próxima vacinação', progress: 91, applied: 10, pending: 1, overdue: 0 },
    { id: '2', name: 'Helena Martins', age: '2 anos e 3m', status: 'Vacina atrasada', progress: 73, applied: 8, pending: 3, overdue: 1 },
    { id: '3', name: 'Laura Martins', age: '5 anos', status: 'Vacina atrasada', progress: 63, applied: 5, pending: 3, overdue: 2 },
    { id: '4', name: 'Miguel Martins', age: '8 anos', status: 'Em dia', progress: 100, applied: 8, pending: 0, overdue: 0 },
    { id: '5', name: 'Sofia Martins', age: '10 anos', status: 'Próxima vacinação', progress: 80, applied: 4, pending: 1, overdue: 0 }
  ];

  filteredChildren: Child[] = [...this.children];

  searchTerm: string = '';
  activeFilter: string = 'all';
  sortBy: 'name' | 'progress' | 'age' = 'name';

  filters = [
    { label: 'Todos', value: 'all' },
    { label: 'Em dia', value: 'Em dia' },
    { label: 'Próximos', value: 'Próxima vacinação' },
    { label: 'Atrasados', value: 'Vacina atrasada' }
  ];

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.children];

    // Filtro por busca
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(child => child.name.toLowerCase().includes(term));
    }

    // Filtro por status
    if (this.activeFilter !== 'all') {
      result = result.filter(child => child.status === this.activeFilter);
    }

    // Ordenação
    result.sort((a, b) => {
      if (this.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortBy === 'progress') {
        return b.progress - a.progress;
      } else if (this.sortBy === 'age') {
        // Ordenação simples por idade (aproximada)
        return parseInt(b.age) - parseInt(a.age);
      }
      return 0;
    });

    this.filteredChildren = result;
  }

  
  sortOptions = [
    { label: 'Ordenar: Nome', value: 'name' },
    { label: 'Ordenar: Progresso', value: 'progress' },
    { label: 'Ordenar: Idade', value: 'age' }
  ];

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }

  onSortChange(value: string) {
    this.sortBy = value as 'name' | 'progress' | 'age';
    this.applyFilters();
  }
}