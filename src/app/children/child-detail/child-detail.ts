import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageHeader } from "../../shared/components/page-header/page-header";
import { FilterToolbar } from "../../shared/components/filter-toolbar/filter-toolbar";
import {ReportsCard } from '../../shared/components/reports-card/reports-card';
import { CHILD_DETAIL_DATA } from '../../mocks/child-detail.data';
import { ChildDetailData, Vaccine, Metric } from '../../shared/models/child-detail.model';


@Component({
  selector: 'app-child-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeader, FilterToolbar, ReportsCard],
  templateUrl: './child-detail.html',
  styleUrl: './child-detail.css',
})
export class ChildDetail implements OnInit {
  child!: ChildDetailData;
  filteredVaccines: Vaccine[] = [];
  searchTerm: string = '';
  activeFilter: string = 'Todas';
  metrics: Metric[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    const found = CHILD_DETAIL_DATA.find(c => c.id === id);

    if (found) {
      this.child = found;
      this.filteredVaccines = [...this.child.vacinas];
      this.filterVaccines();
      this.createMetrics();
    } else {
      this.router.navigate(['/children']);
    }
  }

  private createMetrics() {
    this.metrics = [
      { title: 'APLICADAS', value: this.child.contadores.aplicadas, subtitle: 'Vacinas já aplicadas', icon: 'bi bi-check-circle-fill', color: 'var(--primary)' },
      { title: 'PENDENTES', value: this.child.contadores.pendentes, subtitle: 'Próximas vacinas', icon: 'bi bi-clock-history', color: 'var(--accent)' },
      { title: 'ATRASADAS', value: this.child.contadores.atrasadas, subtitle: 'Urgente atenção', icon: 'bi bi-exclamation-triangle-fill', color: '#ef4444' },
      { title: 'TOTAL', value: this.child.contadores.total, subtitle: 'Vacinas no calendário', icon: 'bi bi-calendar3', color: 'var(--dark)' }
    ];
  }

  filterVaccines() {
    if (!this.child) return;

    let result = [...this.child.vacinas];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(v => 
        v.nome.toLowerCase().includes(term) || 
        v.desc.toLowerCase().includes(term)
      );
    }

    if (this.activeFilter !== 'Todas') {
      result = result.filter(v => v.status === this.activeFilter);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.data.split('/').reverse().join('-'));
      const dateB = new Date(b.data.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });

    this.filteredVaccines = result;
  }

  get filters() {
    return [
      { label: `Todas (${this.child?.vacinas.length || 0})`, value: 'Todas' },
      { label: `Aplicadas (${this.getCount('Aplicada')})`, value: 'Aplicada' },
      { label: `Próximas (${this.getCount('Próxima')})`, value: 'Próxima' },
      { label: `Atrasadas (${this.getCount('Atrasada')})`, value: 'Atrasada' }
    ];
  }

  private getCount(status: string): number {
    if (!this.child) return 0;
    return this.child.vacinas.filter(v => v.status === status).length;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Aplicada': return 'success';
      case 'Próxima': return 'warning';
      case 'Atrasada': return 'danger';
      default: return '';
    }
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.filterVaccines();
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.filterVaccines();
  }

  goBack(): void {
    this.router.navigate(['/children']);
  }
}