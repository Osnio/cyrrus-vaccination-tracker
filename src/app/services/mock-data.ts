import type { Campaign, Child, Vaccine, VaccineRecord } from '../shared/models/models';

export const vaccines: Vaccine[] = [
  {
    id: "v-bcg",
    name: "BCG",
    description: "Protege contra formas graves da tuberculose, como a meningite tuberculosa.",
    ageRecommendation: "Ao nascer",
    doses: 1,
    campaignEligible: false,
    category: "obrigatoria",
    benefits: ["Previne tuberculose grave", "Dose única", "Imunidade duradoura"],
  },
  {
    id: "v-hepb",
    name: "Hepatite B",
    description: "Imunização contra o vírus da Hepatite B, prevenindo cirrose e câncer de fígado.",
    ageRecommendation: "Ao nascer, 2, 4 e 6 meses",
    doses: 4,
    campaignEligible: false,
    category: "obrigatoria",
    benefits: ["Proteção hepática", "Esquema completo na infância"],
  },
  {
    id: "v-penta",
    name: "Pentavalente",
    description: "Combina proteção contra Difteria, Tétano, Coqueluche, Hib e Hepatite B.",
    ageRecommendation: "2, 4 e 6 meses",
    doses: 3,
    campaignEligible: false,
    category: "obrigatoria",
    benefits: ["5 em 1", "Reduz número de aplicações"],
  },
  {
    id: "v-vip",
    name: "Poliomielite (VIP)",
    description: "Vacina inativada poliomielite, protege contra a paralisia infantil.",
    ageRecommendation: "2, 4 e 6 meses",
    doses: 3,
    campaignEligible: true,
    category: "obrigatoria",
    benefits: ["Erradicação da pólio", "Segura e eficaz"],
  },
  {
    id: "v-rota",
    name: "Rotavírus",
    description: "Previne diarreias graves causadas pelo rotavírus em bebês.",
    ageRecommendation: "2 e 4 meses",
    doses: 2,
    campaignEligible: false,
    category: "obrigatoria",
    benefits: ["Evita desidratação grave", "Reduz internações"],
  },
  {
    id: "v-pneumo",
    name: "Pneumocócica 10",
    description: "Protege contra pneumonia, otite e meningite por pneumococo.",
    ageRecommendation: "2, 4 meses e reforço aos 12 meses",
    doses: 3,
    campaignEligible: false,
    category: "obrigatoria",
    benefits: ["Reduz pneumonias graves", "Protege ouvido médio"],
  },
  {
    id: "v-meningo",
    name: "Meningocócica C",
    description: "Imuniza contra meningite meningocócica do tipo C.",
    ageRecommendation: "3, 5 meses e reforço aos 12 meses",
    doses: 3,
    campaignEligible: false,
    category: "obrigatoria",
    benefits: ["Previne meningite", "Reforço aos 12 meses"],
  },
  {
    id: "v-trip",
    name: "Tríplice Viral",
    description: "Protege contra Sarampo, Caxumba e Rubéola.",
    ageRecommendation: "12 meses",
    doses: 2,
    campaignEligible: true,
    category: "obrigatoria",
    benefits: ["Proteção tripla", "Campanhas nacionais frequentes"],
  },
  {
    id: "v-febam",
    name: "Febre Amarela",
    description: "Imunização contra o vírus da febre amarela, recomendada em todo território nacional.",
    ageRecommendation: "9 meses",
    doses: 1,
    campaignEligible: true,
    category: "obrigatoria",
    benefits: ["Dose única", "Validade prolongada"],
  },
  {
    id: "v-influ",
    name: "Influenza",
    description: "Vacina anual contra os principais subtipos do vírus Influenza.",
    ageRecommendation: "A partir de 6 meses, anualmente",
    doses: 1,
    campaignEligible: true,
    category: "campanha",
    benefits: ["Reduz hospitalizações", "Atualização anual"],
  },
];

export const children: Child[] = [
  {
    id: "c-helena",
    name: "Helena Martins",
    photo: "https://api.dicebear.com/7.x/adventurer/svg?seed=Helena&backgroundColor=ABC270",
    birthDate: "2024-03-12",
    gender: "female",
  },
  {
    id: "c-arthur",
    name: "Arthur Martins",
    photo: "https://api.dicebear.com/7.x/adventurer/svg?seed=Arthur&backgroundColor=FEC868",
    birthDate: "2022-08-04",
    gender: "male",
  },
  {
    id: "c-laura",
    name: "Laura Martins",
    photo: "https://api.dicebear.com/7.x/adventurer/svg?seed=Laura&backgroundColor=FDA769",
    birthDate: "2020-11-21",
    gender: "female",
  },
  {
    id: "c-miguel",
    name: "Miguel Martins",
    photo: "https://api.dicebear.com/7.x/adventurer/svg?seed=Miguel&backgroundColor=ABC270",
    birthDate: "2018-05-30",
    gender: "male",
  },
  {
    id: "c-sofia",
    name: "Sofia Martins",
    photo: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia&backgroundColor=FEC868",
    birthDate: "2016-01-09",
    gender: "female",
  },
];

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (base: Date, days: number) => {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Builds a realistic schedule.
 */
function buildRecords(): VaccineRecord[] {
  const out: VaccineRecord[] = [];
  let id = 1;

  const push = (r: Omit<VaccineRecord, "id">) => {
    out.push({ id: `r-${id++}`, ...r });
  };

  // Helena (10 months) - parcial
  push({ childId: "c-helena", vaccineId: "v-bcg", doseNumber: 1, applied: true, applicationDate: "2024-03-13", dueDate: "2024-03-12" });
  push({ childId: "c-helena", vaccineId: "v-hepb", doseNumber: 1, applied: true, applicationDate: "2024-03-13", dueDate: "2024-03-12" });
  push({ childId: "c-helena", vaccineId: "v-penta", doseNumber: 1, applied: true, applicationDate: "2024-05-15", dueDate: "2024-05-12" });
  push({ childId: "c-helena", vaccineId: "v-penta", doseNumber: 2, applied: true, applicationDate: "2024-07-14", dueDate: "2024-07-12" });
  push({ childId: "c-helena", vaccineId: "v-penta", doseNumber: 3, applied: false, dueDate: iso(addDays(today, 14)) });
  push({ childId: "c-helena", vaccineId: "v-rota", doseNumber: 1, applied: true, applicationDate: "2024-05-15", dueDate: "2024-05-12" });
  push({ childId: "c-helena", vaccineId: "v-rota", doseNumber: 2, applied: true, applicationDate: "2024-07-15", dueDate: "2024-07-12" });
  push({ childId: "c-helena", vaccineId: "v-pneumo", doseNumber: 1, applied: true, applicationDate: "2024-05-15", dueDate: "2024-05-12" });
  push({ childId: "c-helena", vaccineId: "v-pneumo", doseNumber: 2, applied: false, dueDate: iso(addDays(today, -10)) });
  push({ childId: "c-helena", vaccineId: "v-meningo", doseNumber: 1, applied: true, applicationDate: "2024-06-13", dueDate: "2024-06-12" });
  push({ childId: "c-helena", vaccineId: "v-meningo", doseNumber: 2, applied: false, dueDate: iso(addDays(today, 28)) });

  // Arthur (~3 anos) - em dia
  push({ childId: "c-arthur", vaccineId: "v-bcg", doseNumber: 1, applied: true, applicationDate: "2022-08-05", dueDate: "2022-08-04" });
  push({ childId: "c-arthur", vaccineId: "v-hepb", doseNumber: 1, applied: true, applicationDate: "2022-08-05", dueDate: "2022-08-04" });
  push({ childId: "c-arthur", vaccineId: "v-penta", doseNumber: 1, applied: true, applicationDate: "2022-10-04", dueDate: "2022-10-04" });
  push({ childId: "c-arthur", vaccineId: "v-penta", doseNumber: 2, applied: true, applicationDate: "2022-12-04", dueDate: "2022-12-04" });
  push({ childId: "c-arthur", vaccineId: "v-penta", doseNumber: 3, applied: true, applicationDate: "2023-02-04", dueDate: "2023-02-04" });
  push({ childId: "c-arthur", vaccineId: "v-vip", doseNumber: 1, applied: true, applicationDate: "2022-10-04", dueDate: "2022-10-04" });
  push({ childId: "c-arthur", vaccineId: "v-vip", doseNumber: 2, applied: true, applicationDate: "2022-12-04", dueDate: "2022-12-04" });
  push({ childId: "c-arthur", vaccineId: "v-vip", doseNumber: 3, applied: true, applicationDate: "2023-02-04", dueDate: "2023-02-04" });
  push({ childId: "c-arthur", vaccineId: "v-trip", doseNumber: 1, applied: true, applicationDate: "2023-08-04", dueDate: "2023-08-04" });
  push({ childId: "c-arthur", vaccineId: "v-febam", doseNumber: 1, applied: true, applicationDate: "2023-05-04", dueDate: "2023-05-04" });
  push({ childId: "c-arthur", vaccineId: "v-influ", doseNumber: 1, applied: false, dueDate: iso(addDays(today, 21)) });

  // Laura (~5 anos) - atrasada
  push({ childId: "c-laura", vaccineId: "v-bcg", doseNumber: 1, applied: true, applicationDate: "2020-11-22", dueDate: "2020-11-21" });
  push({ childId: "c-laura", vaccineId: "v-penta", doseNumber: 1, applied: true, applicationDate: "2021-01-21", dueDate: "2021-01-21" });
  push({ childId: "c-laura", vaccineId: "v-penta", doseNumber: 2, applied: true, applicationDate: "2021-03-21", dueDate: "2021-03-21" });
  push({ childId: "c-laura", vaccineId: "v-penta", doseNumber: 3, applied: true, applicationDate: "2021-05-21", dueDate: "2021-05-21" });
  push({ childId: "c-laura", vaccineId: "v-trip", doseNumber: 1, applied: true, applicationDate: "2021-11-22", dueDate: "2021-11-21" });
  push({ childId: "c-laura", vaccineId: "v-trip", doseNumber: 2, applied: false, dueDate: iso(addDays(today, -120)) });
  push({ childId: "c-laura", vaccineId: "v-febam", doseNumber: 1, applied: false, dueDate: iso(addDays(today, -45)) });
  push({ childId: "c-laura", vaccineId: "v-influ", doseNumber: 1, applied: false, dueDate: iso(addDays(today, 7)) });

  // Miguel (~7 anos) - completo
  push({ childId: "c-miguel", vaccineId: "v-bcg", doseNumber: 1, applied: true, applicationDate: "2018-06-01", dueDate: "2018-05-30" });
  push({ childId: "c-miguel", vaccineId: "v-penta", doseNumber: 1, applied: true, applicationDate: "2018-07-30", dueDate: "2018-07-30" });
  push({ childId: "c-miguel", vaccineId: "v-penta", doseNumber: 2, applied: true, applicationDate: "2018-09-30", dueDate: "2018-09-30" });
  push({ childId: "c-miguel", vaccineId: "v-penta", doseNumber: 3, applied: true, applicationDate: "2018-11-30", dueDate: "2018-11-30" });
  push({ childId: "c-miguel", vaccineId: "v-trip", doseNumber: 1, applied: true, applicationDate: "2019-05-30", dueDate: "2019-05-30" });
  push({ childId: "c-miguel", vaccineId: "v-trip", doseNumber: 2, applied: true, applicationDate: "2020-05-30", dueDate: "2020-05-30" });
  push({ childId: "c-miguel", vaccineId: "v-febam", doseNumber: 1, applied: true, applicationDate: "2019-02-28", dueDate: "2019-02-28" });
  push({ childId: "c-miguel", vaccineId: "v-influ", doseNumber: 1, applied: true, applicationDate: iso(addDays(today, -60)), dueDate: iso(addDays(today, -65)) });

  // Sofia (~10 anos) - próximas vacinas
  push({ childId: "c-sofia", vaccineId: "v-bcg", doseNumber: 1, applied: true, applicationDate: "2016-01-10", dueDate: "2016-01-09" });
  push({ childId: "c-sofia", vaccineId: "v-trip", doseNumber: 1, applied: true, applicationDate: "2017-01-09", dueDate: "2017-01-09" });
  push({ childId: "c-sofia", vaccineId: "v-trip", doseNumber: 2, applied: true, applicationDate: "2018-01-09", dueDate: "2018-01-09" });
  push({ childId: "c-sofia", vaccineId: "v-febam", doseNumber: 1, applied: true, applicationDate: "2016-10-09", dueDate: "2016-10-09" });
  push({ childId: "c-sofia", vaccineId: "v-influ", doseNumber: 1, applied: false, dueDate: iso(addDays(today, 12)) });

  return out;
}

export const vaccineRecords: VaccineRecord[] = buildRecords();

export const campaigns: Campaign[] = [
  {
    id: "cmp-influ",
    title: "Campanha Nacional de Vacinação contra a Gripe 2026",
    description: "Imunização gratuita contra os subtipos circulantes do vírus Influenza, com foco em crianças de 6 meses a 6 anos.",
    targetAudience: "Crianças de 6 meses a 6 anos",
    startDate: iso(addDays(today, -10)),
    endDate: iso(addDays(today, 50)),
    active: true,
    vaccineIds: ["v-influ"],
    color: "primary",
  },
  {
    id: "cmp-polio",
    title: "Dia D Multivacinação - Poliomielite",
    description: "Atualização da caderneta de vacinação com foco em poliomielite e demais vacinas pendentes da rotina infantil.",
    targetAudience: "Crianças menores de 5 anos",
    startDate: iso(addDays(today, -3)),
    endDate: iso(addDays(today, 25)),
    active: true,
    vaccineIds: ["v-vip"],
    color: "secondary",
  },
  {
    id: "cmp-sarampo",
    title: "Bloqueio Vacinal - Sarampo",
    description: "Ação emergencial de prevenção ao sarampo com aplicação da vacina Tríplice Viral em grupos prioritários.",
    targetAudience: "Crianças de 1 a 10 anos",
    startDate: iso(addDays(today, 14)),
    endDate: iso(addDays(today, 75)),
    active: false,
    vaccineIds: ["v-trip"],
    color: "accent",
  },
  {
    id: "cmp-fa",
    title: "Atualização Febre Amarela",
    description: "Verificação e atualização da vacinação contra febre amarela em zonas de recomendação ampliada.",
    targetAudience: "Toda a família",
    startDate: iso(addDays(today, -120)),
    endDate: iso(addDays(today, -10)),
    active: false,
    vaccineIds: ["v-febam"],
    color: "accent",
  },
  {
    id: "cmp-hpv",
    title: "Programa HPV Adolescentes",
    description: "Campanha de prevenção ao HPV com foco em adolescentes de 9 a 14 anos, conforme PNI.",
    targetAudience: "Crianças e adolescentes 9-14 anos",
    startDate: iso(addDays(today, -30)),
    endDate: iso(addDays(today, 90)),
    active: true,
    vaccineIds: [],
    color: "secondary",
  },
];