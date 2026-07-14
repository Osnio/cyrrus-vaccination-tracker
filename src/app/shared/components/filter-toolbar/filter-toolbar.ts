import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomSelect } from "../custom-select/custom-select";

@Component({
  selector: 'app-filter-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomSelect],
  templateUrl: './filter-toolbar.html',
  styleUrl: './filter-toolbar.css',
})
export class FilterToolbar {
  @Input() searchTerm: string = '';
  @Input() activeFilter: string = 'all';
  @Input() sortBy: string = 'recent';
  @Input() startDate: string = '';
  @Input() endDate: string = '';

  @Input() filters: any[] = [];
  @Input() sortOptions: any[] = [];

  // Novos inputs para controlar visibilidade
  @Input() showStatusFilter: boolean = true;
  @Input() showSortFilter: boolean = true;
  @Input() showDateFilter: boolean = true;
  @Input() showClearButton: boolean = true;

  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() startDateChange = new EventEmitter<string>();
  @Output() endDateChange = new EventEmitter<string>();
  @Output() clearFiltersEvent = new EventEmitter<void>();

  onSearchChange(term: string) {
    this.searchChange.emit(term);
  }

  get statusOptions() {
    return this.filters;
  }

  onFilterChange(value: string) {
    this.filterChange.emit(value);
  }

  onSortChange(value: string) {
    this.sortChange.emit(value);
  }

  onStartDateChange(date: string) {
    this.startDateChange.emit(date);
  }

  onEndDateChange(date: string) {
    this.endDateChange.emit(date);
  }

  clearFilters() {
    this.clearFiltersEvent.emit();
  }
}