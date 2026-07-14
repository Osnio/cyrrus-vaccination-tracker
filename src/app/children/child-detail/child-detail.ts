import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PageHeader } from "../../shared/components/page-header/page-header";
import { FilterToolbar } from "../../shared/components/filter-toolbar/filter-toolbar";
import { ReportsCard } from '../../shared/components/reports-card/reports-card';

import { RegisterVaccineModal } from '../../shared/components/register-vaccine-modal/register-vaccine-modal';

import { ChildDetailData, Vaccine, Metric } from '../../shared/models/child-detail.model';
import { ChildService } from '../../services/child.service';
import { ToastService } from '../../services/toast.service';
import { AddExtraVaccineModal } from "../../shared/components/add-extra-vaccine-modal/add-extra-vaccine-modal";
import { AddChildModal } from "../../shared/components/add-child-modal/add-child-modal";

@Component({
  selector: 'app-child-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeader,
    FilterToolbar,
    ReportsCard,
    RegisterVaccineModal,
    AddExtraVaccineModal,
    AddChildModal
],
  templateUrl: './child-detail.html',
  styleUrl: './child-detail.css',
})
export class ChildDetail implements OnInit {
  child!: ChildDetailData;
  filteredVaccines: Vaccine[] = [];
  
  showEditModal = false;
  showAddModal = false;      // ← Para adicionar
  
  searchTerm: string = '';
  activeFilter: string = 'Todas';
  metrics: Metric[] = [];

  showRegisterModal = false;
  selectedVaccineIndex = -1;
  showAddVaccineModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private childService: ChildService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    const found = this.childService.getChildDetail(id);

    if (found) {
      this.child = { ...found }; // cópia para evitar mutação direta
      this.filteredVaccines = [...this.child.vacinas];
      this.filterVaccines();
      this.createMetrics();
    } else {
      this.router.navigate(['/children']);
    }
  }

  public createMetrics() {
    this.metrics = [
      { 
        title: 'APLICADAS', 
        value: this.child.contadores.aplicadas, 
        subtitle: 'Vacinas já aplicadas', 
        icon: 'bi bi-check-circle-fill', 
        color: 'var(--primary)' 
      },
      { 
        title: 'PENDENTES', 
        value: this.child.contadores.pendentes, 
        subtitle: 'Próximas vacinas', 
        icon: 'bi bi-clock-history', 
        color: 'var(--accent)' 
      },
      { 
        title: 'ATRASADAS', 
        value: this.child.contadores.atrasadas, 
        subtitle: 'Urgente atenção', 
        icon: 'bi bi-exclamation-triangle-fill', 
        color: '#ef4444' 
      },
      { 
        title: 'TOTAL', 
        value: this.child.contadores.total, 
        subtitle: 'Vacinas no calendário', 
        icon: 'bi bi-calendar3', 
        color: 'var(--dark)' 
      }
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
      case 'Aplicada': return 'bg-(--primary) text-white';
      case 'Próxima': return 'bg-(--accent) text-(--dark)';
      case 'Atrasada': return 'bg-red-500 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  registerApplication(index: number) {
    this.selectedVaccineIndex = index;
    this.showRegisterModal = true;
  }

  addExtraVaccine() {
    this.showAddVaccineModal = true;
  }

  onRegisterModalClosed() {
    this.showRegisterModal = false;
    this.filterVaccines();
    this.createMetrics();
  }

  onAddVaccineModalClosed() {
    this.showAddVaccineModal = false;
    this.filterVaccines();
    this.createMetrics();
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

  isNew(): boolean {
    if (!this.child?.createdAt) return false;
    const created = new Date(this.child.createdAt);
    const days = (Date.now() - created.getTime()) / (1000 * 3600 * 24);
    return days <= 15;
  }

  formatCreatedDate(createdAt: string): string {
    if (!createdAt) return '';

    const date = new Date(createdAt);

    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  private loadChild() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    const found = this.childService.getChildDetail(id);

    if (found) {
      this.child = { ...found };
      this.filteredVaccines = [...this.child.vacinas];
      this.filterVaccines();
      this.createMetrics();
    } else {
      this.router.navigate(['/children']);
    }
  }

  editChild() {
    this.showEditModal = true;
  }

  closeModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    // Recarrega os dados
    this.loadChild();
  }
}