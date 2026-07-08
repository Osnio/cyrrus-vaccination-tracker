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
  children: Child[] = [];
  filteredChildren: Child[] = [];
  showAddModal = false;

  searchTerm: string = '';
  activeFilter: string = 'all';
  sortBy: 'name' | 'progress' | 'age' = 'name';

  filters = [ /* ... mesmo array */ ];
  sortOptions = [ /* ... mesmo array */ ];

  constructor(private childService: ChildService) {
    this.childService.children$.subscribe(children => {
      this.children = children;
      this.filteredChildren = [...children];
      this.applyFilters(); // garante que filtros sejam reaplicados
    });
  }

  applyFilters(): void {
    let result = [...this.children];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(child => child.name.toLowerCase().includes(term));
    }

    if (this.activeFilter !== 'all') {
      result = result.filter(child => child.status === this.activeFilter);
    }

    // sort ...
    result.sort((a, b) => {
      if (this.sortBy === 'name') return a.name.localeCompare(b.name);
      if (this.sortBy === 'progress') return b.progress - a.progress;
      if (this.sortBy === 'age') return parseInt(b.age) - parseInt(a.age);
      return 0;
    });

    this.filteredChildren = result;
  }

  // setFilter, onSearchChange, onSortChange, openAddModal, closeAddModal mantidos
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
    this.applyFilters();
  }
}