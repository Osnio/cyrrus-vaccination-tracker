import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Metric {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-reports-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-card.html',
  styleUrl: './reports-card.css',
})
export class ReportsCard {
  @Input({ required: true }) metric!: Metric;
}