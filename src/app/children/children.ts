import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StatusBadge } from '../shared/component/status-badge/status-badge'; 
import { ProgressBar } from '../shared/component/progress-bar/progress-bar';

import type { ChildWithStatus } from '../shared/models/models';
import { ChildCard } from "../shared/component/child-card/child-card";

// import { ChevronRight } from 'lucide-angular';
@Component({
  selector: 'app-children',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    StatusBadge,
    ProgressBar, ChildCard],
  templateUrl: './children.html',
  styleUrl: './children.css',
})
export class Children {
  @Input() child!: ChildWithStatus;

  getProgressTone(): 'primary' | 'secondary' | 'accent' {
    if (this.child.vaccinationStatus === 'overdue') return 'accent';
    if (this.child.vaccinationStatus === 'upcoming') return 'secondary';
    return 'primary';
  }
}
