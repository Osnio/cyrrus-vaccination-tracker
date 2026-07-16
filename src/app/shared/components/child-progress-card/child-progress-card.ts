import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildSummary } from '../../models/dashboard.model';

@Component({
  selector: 'app-child-progress-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-progress-card.html',
  styleUrl: './child-progress-card.css',
})
export class ChildProgressCard {
  @Input({ required: true }) child!: ChildSummary;

  getInitials(nomeCompleto: string = ''): string {
    if (!nomeCompleto) return '??';
    
    const nomes = nomeCompleto.trim().split(' ');
    if (nomes.length === 1) {
      return nomes[0].substring(0, 2).toUpperCase();
    }
    return (nomes[0][0] + nomes[nomes.length - 1][0]).toUpperCase();
  }
}