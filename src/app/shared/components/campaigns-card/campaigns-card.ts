import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Campaign {
  id: number;
  titulo: string;
  descricao: string;
  publico: string;
  periodo: string;
  status: string;
}

@Component({
  selector: 'app-campaigns-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaigns-card.html',
  styleUrl: './campaigns-card.css',
})
export class CampaignsCard {
  @Input({ required: true }) campaign!: Campaign;
}