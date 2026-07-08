import { ToastService } from './../../../services/toast.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildService } from '../../../services/child.service';

@Component({
  selector: 'app-register-vaccine-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-vaccine-modal.html',
  styleUrl: './register-vaccine-modal.css',
})
export class RegisterVaccineModal {
  @Input() childId!: number;
  @Input() vaccineIndex!: number;
  @Output() closed = new EventEmitter<void>();

  formData = {
    data: new Date().toISOString().split('T')[0],
    lote: '',
    observacoes: ''
  };

  constructor(
    private childService: ChildService,
    private toastService: ToastService
  ) {}

  onConfirm() {
    const success = this.childService.registerVaccineApplication(
      this.childId,
      this.vaccineIndex,
      this.formData.data
    );

    if (success) {
      this.toastService.show('Aplicação registrada com sucesso!');
      this.closed.emit();
    }
  }

  close() {
    this.closed.emit();
  }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('fixed')) this.close();
  }
}
