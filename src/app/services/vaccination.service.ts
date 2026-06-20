import { Injectable } from '@angular/core';

import { campaigns, children, vaccineRecords, vaccines } from '../services/mock-data';

import type {
  Campaign,
  Child,
  ChildWithStatus,
  RecordStatus,
  Vaccine,
  VaccineRecord,
  VaccinationStatus,
} from '../shared/models/models';

import { ageFromBirth, daysUntil, monthsFromBirth } from '../shared/utils/date';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  getVaccines(): Vaccine[] {
    return vaccines;
  }

  getVaccine(id: string): Vaccine | undefined {
    return vaccines.find((v: Vaccine) => v.id === id);
  }

  getCampaigns(): Campaign[] {
    return campaigns;
  }

  getActiveCampaigns(): Campaign[] {
    return campaigns.filter((c: Campaign) => c.active);
  }

  getChildren(): Child[] {
    return children;
  }

  getChild(id: string): Child | undefined {
    return children.find((c: Child) => c.id === id);
  }

  getRecords(childId?: string): VaccineRecord[] {
    return childId 
      ? vaccineRecords.filter((r: VaccineRecord) => r.childId === childId) 
      : vaccineRecords;
  }

  recordStatus(r: VaccineRecord): RecordStatus {
    if (r.applied) return "applied";
    const diff = daysUntil(r.dueDate);
    if (diff < 0) return "overdue";
    if (diff <= 30) return "upcoming";
    return "pending";
  }

  childStatus(childId: string): VaccinationStatus {
    const recs = this.getRecords(childId);
    const hasOverdue = recs.some((r: VaccineRecord) => this.recordStatus(r) === "overdue");
    if (hasOverdue) return "overdue";
    const hasUpcoming = recs.some((r: VaccineRecord) => this.recordStatus(r) === "upcoming");
    if (hasUpcoming) return "upcoming";
    return "up_to_date";
  }

  childProgress(childId: string): number {
    const recs = this.getRecords(childId);
    if (!recs.length) return 0;
    const applied = recs.filter((r: VaccineRecord) => r.applied).length;
    return Math.round((applied / recs.length) * 100);
  }

  getChildrenWithStatus(): ChildWithStatus[] {
    return children.map((c: Child) => {
      const recs = this.getRecords(c.id);
      const applied = recs.filter((r: VaccineRecord) => r.applied).length;
      const overdue = recs.filter((r: VaccineRecord) => this.recordStatus(r) === "overdue").length;
      const pending = recs.filter((r: VaccineRecord) => !r.applied).length;

      return {
        ...c,
        ageLabel: ageFromBirth(c.birthDate),
        ageMonths: monthsFromBirth(c.birthDate),
        vaccinationStatus: this.childStatus(c.id),
        progressPercentage: this.childProgress(c.id),
        appliedCount: applied,
        pendingCount: pending,
        overdueCount: overdue,
        totalCount: recs.length,
      } as ChildWithStatus;
    });
  }

  familyMetrics() {
    const list = this.getChildrenWithStatus();
    const allRecs = this.getRecords();
    
    const applied = allRecs.filter((r: VaccineRecord) => r.applied).length;
    const overdue = allRecs.filter((r: VaccineRecord) => this.recordStatus(r) === "overdue").length;
    const pending = allRecs.filter((r: VaccineRecord) => !r.applied && this.recordStatus(r) !== "overdue").length;
    const upcoming = allRecs.filter((r: VaccineRecord) => this.recordStatus(r) === "upcoming").length;

    const totalProgress = list.length
      ? Math.round(list.reduce((acc: number, c: ChildWithStatus) => acc + c.progressPercentage, 0) / list.length)
      : 0;

    return {
      children: list.length,
      applied,
      pending,
      overdue,
      upcoming,
      activeCampaigns: this.getActiveCampaigns().length,
      totalProgress,
      childrenWithPendencies: list.filter((c: ChildWithStatus) => c.overdueCount > 0 || c.pendingCount > 0).length,
    };
  }

  upcomingRecords(limit = 6) {
    return vaccineRecords
      .filter((r: VaccineRecord) => !r.applied && daysUntil(r.dueDate) >= 0)
      .sort((a: VaccineRecord, b: VaccineRecord) => daysUntil(a.dueDate) - daysUntil(b.dueDate))
      .slice(0, limit);
  }

  overdueRecords() {
    return vaccineRecords
      .filter((r: VaccineRecord) => !r.applied && daysUntil(r.dueDate) < 0)
      .sort((a: VaccineRecord, b: VaccineRecord) => daysUntil(a.dueDate) - daysUntil(b.dueDate));
  }

  recentApplied(limit = 5) {
    return vaccineRecords
      .filter((r: VaccineRecord) => r.applied && r.applicationDate)
      .sort((a: VaccineRecord, b: VaccineRecord) => 
        (a.applicationDate! < b.applicationDate! ? 1 : -1)
      )
      .slice(0, limit);
  }

  familyHeadline() {
    const m = this.familyMetrics();
    if (m.overdue > 0) {
      return {
        tone: "bad" as const,
        message: `Atenção: existem ${m.overdue} ${m.overdue === 1 ? "vacina em atraso" : "vacinas em atraso"} que necessitam acompanhamento.`,
      };
    }
    if (m.totalProgress >= 85) {
      return {
        tone: "good" as const,
        message: `Excelente! A vacinação da família está ${m.totalProgress}% concluída e em dia.`,
      };
    }
    return {
      tone: "warn" as const,
      message: `Acompanhe de perto: ${m.totalProgress}% do calendário vacinal da família está atualizado.`,
    };
  }
}