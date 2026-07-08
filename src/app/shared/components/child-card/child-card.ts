import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Child, VaccinationStatus } from '../../models/child.model';

@Component({
  selector: 'app-child-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './child-card.html',
  styleUrl: './child-card.css',
})
export class ChildCard {
  @Input({ required: true }) child!: Child;

  getInitials(): string {
    if (!this.child?.name) return '??';
    
    const parts = this.child.name.trim().split(' ').filter(p => p.length > 0);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  getProgressBarClass(): string {
    switch (this.child.status) {
      case 'Em dia': return 'success';
      case 'Próxima vacinação': return 'warning';
      case 'Vacina atrasada': return 'danger';
      default: return 'warning';
    }
  }

  getStatusClass(): string {
    switch (this.child.status) {
      case 'Em dia': return 'success';
      case 'Próxima vacinação': return 'warning';
      case 'Vacina atrasada': return 'danger';
      default: return '';
    }
  }
}