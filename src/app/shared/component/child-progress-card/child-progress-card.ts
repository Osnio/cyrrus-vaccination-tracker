import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChildSummary {
  nome: string;
  idade: string;
  porcentagem: number;
  status: string;
  detalhe: string;
}

@Component({
  selector: 'app-child-progress-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-progress-card.html',
  styleUrl: './child-progress-card.css',
})
export class ChildProgressCard {
  @Input({ required: true }) child!: ChildSummary;
}