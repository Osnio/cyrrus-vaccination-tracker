import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccinationStatus } from '../../models/models';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrls: ['./status-badge.css'],
})
export class StatusBadge {
  @Input() status!: VaccinationStatus;
  @Input() compact = false;

  private statusMap: any = {
    up_to_date: {
      label: 'Em dia',
      className:
        'bg-primary/15 text-[oklch(0.42_0.08_128)] border-primary/30',
      dot: 'bg-primary',
    },
    upcoming: {
      label: 'Próxima vacinação',
      className:
        'bg-secondary/25 text-[oklch(0.42_0.1_75)] border-secondary/40',
      dot: 'bg-secondary',
    },
    overdue: {
      label: 'Vacina atrasada',
      className:
        'bg-accent/20 text-[oklch(0.42_0.13_50)] border-accent/40',
      dot: 'bg-accent',
    },
  };

  getStatusClass(): string {
    return this.statusMap[this.status]?.className || '';
  }

  getDotClass(): string {
    return this.statusMap[this.status]?.dot || 'bg-muted-foreground';
  }

  getLabel(): string {
    const label = this.statusMap[this.status]?.label || '';
    return this.compact ? label.split(' ')[0] : label;
  }
}