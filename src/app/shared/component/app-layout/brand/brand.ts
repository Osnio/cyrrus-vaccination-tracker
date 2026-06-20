import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CalendarHeart } from 'lucide-angular';

@Component({
  selector: 'app-brand',
  imports: [],
  templateUrl: './brand.html',
  styleUrl: './brand.css',
  template: `
    <a [routerLink]="'/'" class="flex items-center gap-2.5">
      <div class="h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-soft">
        <lucide-calendar-heart class="h-5 w-5 text-primary-foreground" [strokeWidth]="2.4"></lucide-calendar-heart>
      </div>
      @if (!compact) {
        <div>
          <p class="text-sm font-extrabold leading-tight tracking-tight" style="color: var(--color-dark)">Cyrrus</p>
          <p class="text-[10px] uppercase tracking-[0.18em] text-muted-foreground leading-tight">Vacinação Infantil</p>
        </div>
      }
    </a>
  `
})
export class Brand {
  @Input() compact = false;
}
