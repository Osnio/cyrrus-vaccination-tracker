import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


export type VaccinationStatus =
  | 'Em dia'
  | 'Próxima vacinação'
  | 'Vacina atrasada';

export interface Child {
  id: string;
  name: string;
  age: string;
  status: VaccinationStatus;
  progress: number;
  applied: number;
  pending: number;
  overdue: number;
}

@Component({
  selector: 'app-child-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-card.html',
  styleUrl: './child-card.css',
})
export class ChildCard {
  @Input({ required: true }) child!: Child;
  

  getProgressBarClass(): string {
    switch (this.child.status) {
      case 'Em dia':
        return 'success';
      case 'Próxima vacinação':
        return 'warning';
      case 'Vacina atrasada':
        return 'danger';
      default:
        return 'warning';
    }
  }

  getStatusClass(): string {
    switch (this.child.status) {
      case 'Em dia':
        return 'success';
      case 'Próxima vacinação':
        return 'warning';
      case 'Vacina atrasada':
        return 'danger';
      default:
        return '';
    }
  }


}
