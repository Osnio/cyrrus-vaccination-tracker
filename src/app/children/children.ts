import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildCard } from "../shared/component/child-card/child-card";
import { PageHeader } from "../shared/component/page-header/page-header";
import { FilterToolbar } from "../shared/component/filter-toolbar/filter-toolbar";
import { CHILDREN_DATA } from '../mocks/children.data';
import { Child } from '../shared/models/child.model';


@Component({
  selector: 'app-children',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildCard, PageHeader, FilterToolbar],
  templateUrl: './children.html',
  styleUrl: './children.css',
})
export class Children {
 children: Child[] = CHILDREN_DATA;
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

  sortOptions = [
    { label: 'Ordenar: Nome', value: 'name' },
    { label: 'Ordenar: Progresso', value: 'progress' },
    { label: 'Ordenar: Idade', value: 'age' }
  ];

  applyFilters(): void {
    let result = [...this.children];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(child => child.name.toLowerCase().includes(term));
    }

    if (this.activeFilter !== 'all') {
      result = result.filter(child => child.status === this.activeFilter);
    }

    result.sort((a, b) => {
      if (this.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortBy === 'progress') {
        return b.progress - a.progress;
      } else if (this.sortBy === 'age') {
        return parseInt(b.age) - parseInt(a.age);
      }
      return 0;
    });

    this.filteredChildren = result;
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  onSortChange(value: string): void {
    this.sortBy = value as 'name' | 'progress' | 'age';
    this.applyFilters();
  }
}