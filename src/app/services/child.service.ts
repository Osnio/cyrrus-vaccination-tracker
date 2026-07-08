import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Child } from '../shared/models/child.model';
import { ChildDetailData, Vaccine } from '../shared/models/child-detail.model';
import { CHILDREN_DATA } from '../mocks/children.data';
import { CHILD_DETAIL_DATA } from '../mocks/child-detail.data';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private childrenSubject = new BehaviorSubject<Child[]>([...CHILDREN_DATA]);
  private childDetailsSubject = new BehaviorSubject<ChildDetailData[]>([...CHILD_DETAIL_DATA]);

  children$ = this.childrenSubject.asObservable();
  childDetails$ = this.childDetailsSubject.asObservable();

  getChildren(): Child[] {
    return this.childrenSubject.value;
  }

  getChildDetail(id: number): ChildDetailData | undefined {
    return this.childDetailsSubject.value.find(c => c.id === id);
  }

  addChild(newChildData: { 
    nome: string; 
    nascimento: string; 
    genero: string; 
    idade?: string;
    photoUrl?: string;
  }): ChildDetailData {
    
    const maxId = Math.max(0, ...this.childDetailsSubject.value.map(c => c.id));
    const id = maxId + 1;

    const childDetail: ChildDetailData = {
      id,
      nome: newChildData.nome,
      nascimento: newChildData.nascimento,
      idade: newChildData.idade || 'Nova criança',
      genero: newChildData.genero,
      statusGeral: 'Próxima vacinação',
      progresso: 0,
      contadores: {
        aplicadas: 0,
        pendentes: 11,
        atrasadas: 0,
        total: 11
      },
      vacinas: [],
      photoUrl: newChildData.photoUrl   // ← Adicionado aqui também
    };

    const childList: Child = {
      id: id.toString(),
      name: newChildData.nome,
      age: newChildData.idade || 'Nova criança',
      status: 'Próxima vacinação',
      progress: 0,
      applied: 0,
      pending: 11,
      overdue: 0,
      photoUrl: newChildData.photoUrl
    };

    this.childrenSubject.next([...this.childrenSubject.value, childList]);
    this.childDetailsSubject.next([...this.childDetailsSubject.value, childDetail]);

    return childDetail;
  }

  // ====================== MÉTODOS EXISTENTES (sem alteração) ======================
  registerVaccineApplication(childId: number, vaccineIndex: number, applicationDate: string): boolean {
    const details = this.childDetailsSubject.value;
    const childIndex = details.findIndex(c => c.id === childId);
    if (childIndex === -1) return false;

    const child = { ...details[childIndex] };
    const vaccine = child.vacinas[vaccineIndex];

    if (!vaccine || vaccine.status === 'Aplicada') return false;

    child.vacinas[vaccineIndex] = { ...vaccine, status: 'Aplicada', data: applicationDate };

    const aplicadas = child.vacinas.filter(v => v.status === 'Aplicada').length;
    const atrasadas = child.vacinas.filter(v => v.status === 'Atrasada').length;
    const pendentes = child.vacinas.length - aplicadas - atrasadas;

    child.contadores = { aplicadas, pendentes, atrasadas, total: child.vacinas.length };
    child.progresso = Math.round((aplicadas / child.contadores.total) * 100);

    if (atrasadas > 0) child.statusGeral = 'Vacina atrasada';
    else if (pendentes > 0) child.statusGeral = 'Próxima vacinação';
    else child.statusGeral = 'Em dia';

    const newDetails = [...details];
    newDetails[childIndex] = child;
    this.childDetailsSubject.next(newDetails);

    this.syncMainList(child);
    return true;
  }

  addExtraVaccine(childId: number, newVaccine: Omit<Vaccine, 'status'>): boolean {
    const details = this.childDetailsSubject.value;
    const childIndex = details.findIndex(c => c.id === childId);
    if (childIndex === -1) return false;

    const child = { ...details[childIndex] };
    child.vacinas = [...child.vacinas, { ...newVaccine, status: 'Próxima' as const }];

    const aplicadas = child.vacinas.filter(v => v.status === 'Aplicada').length;
    const atrasadas = child.vacinas.filter(v => v.status === 'Atrasada').length;
    const pendentes = child.vacinas.length - aplicadas - atrasadas;

    child.contadores = { 
      ...child.contadores, 
      pendentes, 
      total: child.vacinas.length 
    };
    child.progresso = Math.round((aplicadas / child.contadores.total) * 100);

    const newDetails = [...details];
    newDetails[childIndex] = child;
    this.childDetailsSubject.next(newDetails);

    this.syncMainList(child);
    return true;
  }

  private syncMainList(childDetail: ChildDetailData) {
    const children = this.childrenSubject.value;
    const childIndex = children.findIndex(c => c.id === childDetail.id.toString());
    if (childIndex !== -1) {
      const updated: Child = {
        ...children[childIndex],
        progress: childDetail.progresso,
        applied: childDetail.contadores.aplicadas,
        pending: childDetail.contadores.pendentes,
        overdue: childDetail.contadores.atrasadas,
        status: childDetail.statusGeral as any
      };
      children[childIndex] = updated;
      this.childrenSubject.next([...children]);
    }
  }
}