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
  @Input() sortBy: string = 'name';

  @Input() filters: any[] = [];           // Ex: [{label: 'Todos', value: 'all'}, ...]
  @Input() sortOptions: any[] = [];       // Opcional

  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.searchChange.emit(term);
  }

  onFilterChange(value: string) {
    this.activeFilter = value;
    this.filterChange.emit(value);
  }

  onSortChange(value: string) {
    this.sortBy = value;
    this.sortChange.emit(value);
  }
}