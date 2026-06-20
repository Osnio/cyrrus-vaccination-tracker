import { ProgressRing } from './../shared/component/progress-ring/progress-ring';
import { ProgressBar } from './../shared/component/progress-bar/progress-bar';
import { StatusBadge } from './../shared/component/status-badge/status-badge';
import { SectionHeading } from './../shared/component/section-heading/section-heading';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppLayout } from '../shared/component/app-layout/app-layout';
import { StatCard } from '../shared/component/stat-card/stat-card';


import { VaccinationService } from '../services/vaccination.service';
// import { daysUntil, formatDate } from '../shared/utils/date';

import {
  Baby,
  CalendarClock,
  CheckCircle2,
  AlertTriangle,
  Megaphone,
  Sparkles,
  Syringe,
  TrendingUp
} from 'lucide-angular';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterLink,
    AppLayout,
    StatCard,
    ProgressBar,
   
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private vaccinationService = inject(VaccinationService);

  // icons = {
  //   Baby,
  //   CalendarClock,
  //   CheckCircle2,
  //   AlertTriangle,
  //   Megaphone,
  //   Sparkles,
  //   Syringe,
  //   TrendingUp
  // };

  metrics = this.vaccinationService.familyMetrics();
  childrenList = this.vaccinationService.getChildrenWithStatus();
  upcoming = this.vaccinationService.upcomingRecords(5);
  overdue = this.vaccinationService.overdueRecords();
  recent = this.vaccinationService.recentApplied(5);
  campaigns = this.vaccinationService.getActiveCampaigns();
  headline = this.vaccinationService.familyHeadline();

  pieData = [
    { name: 'Aplicadas', value: this.metrics.applied, color: 'var(--color-primary)' },
    { name: 'Pendentes', value: this.metrics.pending, color: 'var(--color-secondary)' },
    { name: 'Atrasadas', value: this.metrics.overdue, color: 'var(--color-accent)' },
  ];

  radialData = [{ name: 'Família', value: this.metrics.totalProgress, fill: 'var(--color-primary)' }];

  // Placeholder para gráficos Recharts
  getRadialProgress(): number {
    return this.metrics.totalProgress;
  }
}
