// import { Injectable } from '@angular/core';
// import { FAMILY_METRICS, PROXIMAS_VACINACOES, ALERTAS_IMPORTANTES, ULTIMAS_APLICADAS, CAMPANHAS_DESTAQUE, RESUMO_CRIANCAS } from '../../mocks/dashboard.data';
// import { FamilyMetrics } from '../../shared/models/dashboard.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class VaccinationService {
//   familyMetrics() {
//     return FAMILY_METRICS;
//   }

//   getChildrenWithStatus() {
//     return RESUMO_CRIANCAS;
//   }

//   upcomingRecords(limit: number = 5) {
//     return PROXIMAS_VACINACOES.slice(0, limit);
//   }

//   overdueRecords() {
//     return ALERTAS_IMPORTANTES;
//   }

//   recentApplied(limit: number = 5) {
//     return ULTIMAS_APLICADAS.slice(0, limit);
//   }

//   getActiveCampaigns() {
//     return CAMPANHAS_DESTAQUE;
//   }

//   familyHeadline() {
//     return "Família Martins";
//   }
// }