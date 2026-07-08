import { Component, EventEmitter, Output } from '@angular/core';
import { ChildService } from '../../../services/child.service';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-child-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-child-modal.html',
  styleUrl: './add-child-modal.css',
})
export class AddChildModal {
  @Output() closed = new EventEmitter<void>();

  formData = {
    nome: '',
    nascimento: '',
    genero: '',
    idade: 'Nova criança'
  };

  constructor(
    private childService: ChildService,
    private toastService: ToastService
  ) {}

  onSubmit() {
    if (!this.formData.nome || !this.formData.nascimento || !this.formData.genero) return;

    this.childService.addChild(this.formData);
    this.toastService.show('Criança cadastrada com sucesso!');
    this.close();
  }

  close() {
    this.closed.emit();
  }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('fixed')) this.close();
  }
}
