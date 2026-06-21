import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-ring',
  imports: [CommonModule],
  templateUrl: './progress-ring.html',
  styleUrl: './progress-ring.css',
  template: `
    <div class="relative inline-flex items-center justify-center" [style.width.px]="size" [style.height.px]="size">
      <svg [attr.width]="size" [attr.height]="size" class="-rotate-90">
        <circle 
          [attr.cx]="size/2" [attr.cy]="size/2" 
          [attr.r]="radius" 
          stroke="var(--color-muted)" 
          stroke-width="6" fill="none"/>
        <circle 
          [attr.cx]="size/2" [attr.cy]="size/2" 
          [attr.r]="radius" 
          stroke="var(--color-primary)" 
          stroke-width="6" stroke-linecap="round" fill="none"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="offset"/>
      </svg>
      <div class="absolute inset-0 grid place-items-center">
        <span class="text-sm font-extrabold text-(--color-dark)">{{ value }}%</span>
      </div>
    </div>
  `
})
export class ProgressRing {
  @Input() value: number = 0;
  @Input() size: number = 64;

  get radius() { return (this.size - 6) / 2; }
  get circumference() { return 2 * Math.PI * this.radius; }
  get offset() { return this.circumference - (this.value / 100) * this.circumference; }
}
