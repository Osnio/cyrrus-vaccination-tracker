import { differenceInDays, differenceInMonths, differenceInYears, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const parse = (iso: string) => parseISO(iso);

export const formatDate = (iso: string, pattern = "dd 'de' MMM, yyyy") =>
  format(parse(iso), pattern, { locale: ptBR });

export const formatShort = (iso: string) => format(parse(iso), "dd/MM/yyyy");

export const ageFromBirth = (iso: string) => {
  const d = parse(iso);
  const years = differenceInYears(new Date(), d);
  const months = differenceInMonths(new Date(), d) % 12;
  
  if (years === 0) return `${differenceInMonths(new Date(), d)} meses`;
  if (years < 3) return `${years} ${years === 1 ? "ano" : "anos"} e ${months}m`;
  return `${years} anos`;
};

export const monthsFromBirth = (iso: string) => differenceInMonths(new Date(), parse(iso));

export const daysUntil = (iso: string) => differenceInDays(parse(iso), new Date());