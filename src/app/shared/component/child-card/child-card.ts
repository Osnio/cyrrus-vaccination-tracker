import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-card.html',
  styleUrl: './child-card.css',
  template: `
    <div class="text-center">
      <p [class]="getColorClass()" class="text-lg font-extrabold">{{ value }}</p>
      <p class="text-[10px] text-muted-foreground uppercase tracking-wider">{{ label }}</p>
    </div>
  `
})
export class ChildCard {
  @Input() label!: string;
  @Input() value!: number;
  @Input() tone: 'primary' | 'secondary' | 'accent' = 'primary';

  getColorClass(): string {
    const colors: any = {
      primary: 'text-[oklch(0.5_0.1_128)]',
      secondary: 'text-[oklch(0.5_0.12_75)]',
      accent: 'text-[oklch(0.5_0.15_50)]'
    };
    return colors[this.tone] || colors.primary;
  }
}
