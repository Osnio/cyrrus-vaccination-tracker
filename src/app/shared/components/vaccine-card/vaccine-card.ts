import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Vaccine {
  nome: string;
  periodo: string;
  isCampanha: boolean;
  descricao: string;
  doses: number;
  beneficios: string[];
}

@Component({
  selector: 'app-vaccine-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vaccine-card.html',
  styleUrl: './vaccine-card.css',
})
export class VaccineCard {
  @Input({ required: true }) vaccine!: Vaccine;
}