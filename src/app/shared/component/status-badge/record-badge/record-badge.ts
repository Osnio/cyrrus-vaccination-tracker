import { RecordStatus } from './../../../models/models';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-record-badge',
  imports: [CommonModule],
  templateUrl: './record-badge.html',
  styleUrl: './record-badge.css',
})
export class RecordBadge {
   @Input() status!: RecordStatus;

  private recordMap: any = {
    applied: {
      label: 'Aplicada',
      className:
        'bg-primary/15 text-[oklch(0.42_0.08_128)] border-primary/30',
      dot: 'bg-primary',
    },
    upcoming: {
      label: 'Próxima',
      className:
        'bg-secondary/25 text-[oklch(0.42_0.1_75)] border-secondary/40',
      dot: 'bg-secondary',
    },
    pending: {
      label: 'Pendente',
      className: 'bg-muted text-muted-foreground border-border',
      dot: 'bg-muted-foreground',
    },
    overdue: {
      label: 'Atrasada',
      className:
        'bg-accent/20 text-[oklch(0.42_0.13_50)] border-accent/40',
      dot: 'bg-accent',
    },
  };

  getStatusClass(): string {
    return this.recordMap[this.status]?.className || '';
  }

  getDotClass(): string {
    return this.recordMap[this.status]?.dot || 'bg-muted-foreground';
  }

  getLabel(): string {
    return this.recordMap[this.status]?.label || '';
  }
}
