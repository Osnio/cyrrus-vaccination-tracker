import { Child } from '../shared/models/child.model';

export const CHILDREN_DATA: Child[] = [
  { 
    id: '1', 
    name: 'Arthur Martins', 
    age: '3 anos', 
    status: 'Próxima vacinação', 
    progress: 91, 
    applied: 10, 
    pending: 1, 
    overdue: 0 
  },
  { 
    id: '2', 
    name: 'Helena Martins', 
    age: '2 anos e 3m', 
    status: 'Vacina atrasada', 
    progress: 73, 
    applied: 8, 
    pending: 3, 
    overdue: 1 
  },
  { 
    id: '3', 
    name: 'Laura Martins', 
    age: '5 anos', 
    status: 'Vacina atrasada', 
    progress: 63, 
    applied: 5, 
    pending: 3, 
    overdue: 2 
  },
  { 
    id: '4', 
    name: 'Miguel Martins', 
    age: '8 anos', 
    status: 'Em dia', 
    progress: 100, 
    applied: 8, 
    pending: 0, 
    overdue: 0 
  },
  { 
    id: '5', 
    name: 'Sofia Martins', 
    age: '10 anos', 
    status: 'Próxima vacinação', 
    progress: 80, 
    applied: 4, 
    pending: 1, 
    overdue: 0 
  }
];