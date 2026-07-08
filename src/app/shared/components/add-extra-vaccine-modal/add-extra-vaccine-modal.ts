import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildService } from '../../../services/child.service';
import { ToastService } from '../../../services/toast.service';
import { Vaccine } from '../../models/child-detail.model';

@Component({
  selector: 'app-add-extra-vaccine-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-extra-vaccine-modal.html',
  styleUrl: './add-extra-vaccine-modal.css',
})
export class AddExtraVaccineModal {
  @Input() childId!: number;
  @Output() closed = new EventEmitter<void>();

  formData: Omit<Vaccine, 'status'> = {
    nome: '',
    dose: '',
    desc: '',
    data: '',
    recom: ''
  };

  constructor(
    private childService: ChildService,
    private toastService: ToastService
  ) {}

  onSubmit() {
    if (!this.formData.nome || !this.formData.dose || !this.formData.data) {
      return;
    }

    const success = this.childService.addExtraVaccine(this.childId, this.formData);

    if (success) {
      this.toastService.show('Vacina adicionada com sucesso!');
      this.closed.emit();
    }
  }

  close() {
    this.closed.emit();
  }
}