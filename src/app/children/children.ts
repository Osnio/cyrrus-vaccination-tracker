import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChildCard } from "../shared/components/child-card/child-card";
import { PageHeader } from "../shared/components/page-header/page-header";
import { FilterToolbar } from "../shared/components/filter-toolbar/filter-toolbar";
import { AddChildModal } from "../shared/components/add-child-modal/add-child-modal";

import { ChildService } from "../services/child.service";
import { Child } from '../shared/models/child.model';
import { Pagination } from "../shared/components/pagination/pagination";



@Component({
  selector: 'app-children',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildCard, PageHeader, FilterToolbar, AddChildModal, Pagination],
  templateUrl: './children.html',
  styleUrl: './children.css',
})
export class Children {
  
  public readonly PAGE_SIZE = 6;
  
  currentPage = 1;
  children: Child[] = [];
  filteredChildren: Child[] = [];
  pagedChildren: Child[] = [];

  showAddModal = false;
  isClosingModal = false;

  startDate: string = '';
  endDate: string = '';

  searchTerm: string = '';
  activeFilter: string = 'all';
  sortBy: 'name' | 'recent' | 'age' = 'recent'; 

  filters = [
    { label: 'Todos', value: 'all' },
    { label: 'Em dia', value: 'Em dia' },
    { label: 'Próximos', value: 'Próxima vacinação' },
    { label: 'Atrasados', value: 'Vacina atrasada' }
  ];

  sortOptions = [
    { label: 'Mais recentes', value: 'recent' },
    { label: 'Nome (A-Z)', value: 'name' },
    { label: 'Idade', value: 'age' }
  ];

  constructor(private childService: ChildService) {
    this.childService.children$.subscribe(children => {
      this.children = children;
      this.applyFilters();
    });
  }

  get totalChildren(): number {
    return this.children.length;
  }


  applyFilters(): void {
    let result = [...this.children];

    // 1. Busca por nome
    if (this.searchTerm?.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(child => child.name.toLowerCase().includes(term));
    }

    // 2. Filtro por status
    if (this.activeFilter !== 'all') {
      result = result.filter(child => child.status === this.activeFilter);
    }

    // 3. Filtro por data de cadastro (CORRIGIDO)
    if (this.startDate) {
      const start = new Date(this.startDate);
      start.setHours(0, 0, 0, 0); // Início do dia
      result = result.filter(child => new Date(child.createdAt) >= start);
    }

    if (this.endDate) {
      const end = new Date(this.endDate);
      end.setHours(23, 59, 59, 999); // Fim do dia
      result = result.filter(child => new Date(child.createdAt) <= end);
    }

    // 4. Ordenação
    result.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);

        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

        case 'age':
          const ageA = parseInt(a.age) || 0;
          const ageB = parseInt(b.age) || 0;
          return ageB - ageA;

        default:
          return 0;
      }
    });

    this.filteredChildren = result;
    this.currentPage = 1;
    this.updatePagedChildren();
  }

  private updatePagedChildren(): void {

    const start = (this.currentPage - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    this.pagedChildren = this.filteredChildren.slice(start, end);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedChildren();
  }

  // ==================== Eventos ====================
  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  onStartDateChange(date: string): void {
    this.startDate = date;
    this.applyFilters();
  }

  onEndDateChange(date: string): void {
    this.endDate = date;
    this.applyFilters();
  }

  onSortChange(value: string): void {
    this.sortBy = value as 'name' | 'recent' | 'age';
    this.applyFilters();
  }
  

  openAddModal() {
    this.showAddModal = true;
    this.isClosingModal = false;
  }

  closeAddModal() {
    this.isClosingModal = true;

    setTimeout(() => {
      this.showAddModal = false;
      this.isClosingModal = false;
    }, 250);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.activeFilter = 'all';
    this.sortBy = 'recent';
    this.startDate = '';
    this.endDate = '';
    this.applyFilters();
  }

}