import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  @Input() icon: any;           // Lucide icon component
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() hint?: string;
  @Input() tone: 'primary' | 'secondary' | 'accent' | 'dark' = 'primary';
  @Input() trend?: { dir: 'up' | 'down'; value: string };

  getToneClass(): string {
    const tones: any = {
      primary: 'bg-primary/15 text-[oklch(0.42_0.08_128)]',
      secondary: 'bg-secondary/25 text-[oklch(0.42_0.1_75)]',
      accent: 'bg-accent/20 text-[oklch(0.42_0.13_50)]',
      dark: 'bg-[oklch(0.32_0.025_55)]/10 text-[color:var(--color-dark)]',
    };
    return tones[this.tone] || tones.primary;
  }

  getTrendClass(): string {
    return this.trend?.dir === 'up' 
      ? 'bg-primary/15 text-[oklch(0.42_0.08_128)]' 
      : 'bg-accent/20 text-[oklch(0.42_0.13_50)]';
  }
}

