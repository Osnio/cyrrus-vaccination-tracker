import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Metric } from '../../models/child-detail.model';

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