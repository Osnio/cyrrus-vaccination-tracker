export interface Vaccine {
  nome: string;
  dose: string;
  desc: string;
  data: string;
  recom: string;
  status: 'Aplicada' | 'Próxima' | 'Atrasada';
}

export interface ChildDetailData {
  id: number;
  nome: string;
  nascimento: string;
  idade: string;
  genero: string;
  statusGeral: string;
  progresso: number;
  contadores: {
    aplicadas: number;
    pendentes: number;
    atrasadas: number;
    total: number;
  };
  vacinas: Vaccine[];
}

export interface Metric {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
}