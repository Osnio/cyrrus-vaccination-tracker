import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChildCard } from "../shared/components/child-card/child-card";
import { PageHeader } from "../shared/components/page-header/page-header";
import { FilterToolbar } from "../shared/components/filter-toolbar/filter-toolbar";
import { AddChildModal } from "../shared/components/add-child-modal/add-child-modal";

import { ChildService } from "../services/child.service";
import { Child } from '../shared/models/child.model';

@Component({
  selector: 'app-children',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildCard, PageHeader, FilterToolbar, AddChildModal],
  templateUrl: './children.html',
  styleUrl: './children.css',
})
export class Children {
  private readonly PAGE_SIZE = 6;

  children: Child[] = [];
  filteredChildren: Child[] = [];
  pagedChildren: Child[] = [];

  currentPage = 1;
  showAddModal = false;

  searchTerm: string = '';
  activeFilter: string = 'all';
  sortBy: 'name' | 'progress' | 'age' = 'name';

  filters = [ /* ... seu array */ ];
  sortOptions = [ /* ... seu array */ ];

  constructor(private childService: ChildService) {
    this.childService.children$.subscribe(children => {
      this.children = children;
      this.applyFilters();
    });
  }

  get totalChildren(): number {
    return this.children.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredChildren.length / this.PAGE_SIZE));
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.PAGE_SIZE + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.PAGE_SIZE, this.filteredChildren.length);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5; // máximo de números de página visíveis

    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  applyFilters(): void {
    let result = [...this.children];

    // Filtro por texto
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(child => child.name.toLowerCase().includes(term));
    }

    // Filtro por status
    if (this.activeFilter !== 'all') {
      result = result.filter(child => child.status === this.activeFilter);
    }

    // Ordenação (mais recentes primeiro por padrão)
    result.sort((a, b) => {
      if (this.sortBy === 'name') return a.name.localeCompare(b.name);
      if (this.sortBy === 'progress') return b.progress - a.progress;
      if (this.sortBy === 'age') return parseInt(b.age) - parseInt(a.age);
      return 0;
    });

    this.filteredChildren = result;
    this.currentPage = 1; // Reset para primeira página ao filtrar
    this.updatePagedChildren();
  }

  private updatePagedChildren(): void {
    const start = (this.currentPage - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    this.pagedChildren = this.filteredChildren.slice(start, end);
  }

  // ==================== Paginação ====================
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedChildren();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedChildren();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedChildren();
    }
  }

  // ==================== Filtros ====================
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

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    // applyFilters já é chamado no subscribe do service
  }
}