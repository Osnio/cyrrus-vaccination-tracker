export type VaccinationStatus = 'Em dia' | 'Próxima vacinação' | 'Vacina atrasada';

export interface Child {
  id: string;
  name: string;
  age: string;
  status: VaccinationStatus;
  progress: number;
  applied: number;
  pending: number;
  overdue: number;
  photoUrl?: string;
  createdAt: string; 
  updatedAt?: string;
  isNew?: boolean;
}