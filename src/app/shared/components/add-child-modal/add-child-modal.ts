import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ChildService } from '../../../services/child.service';
import { ToastService } from '../../../services/toast.service';

interface ChildFormData {
  nome: string;
  nascimento: string;
  genero: 'Masculino' | 'Feminino' | '';
}

@Component({
  selector: 'app-add-child-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-child-modal.html',
  styleUrl: './add-child-modal.css',
})
export class AddChildModal implements OnChanges {
@Input() childToEdit: any = null;
  @Input() isClosing = false;

  @Output() closed = new EventEmitter<void>();

  isEditMode = false;
  editingId: number | null = null;

  formData: ChildFormData = {
    nome: '',
    nascimento: '',
    genero: '',
  };

  imagePreview: SafeUrl | null = null;
  selectedFile: File | null = null;
  isImageLoading = false;

  private readonly childService = inject(ChildService);
  private readonly toastService = inject(ToastService);
  private readonly sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['childToEdit'] && this.childToEdit) {
      this.isEditMode = true;
      this.editingId = this.childToEdit.id;

      this.formData = {
        nome: this.childToEdit.nome || this.childToEdit.name || '',
        nascimento: this.childToEdit.nascimento || '',
        genero: (this.childToEdit.genero as 'Masculino' | 'Feminino') || '',
      };

      if (this.childToEdit.photoUrl) {
        this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(this.childToEdit.photoUrl);
      } else {
        this.imagePreview = null;
      }
      this.selectedFile = null;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      this.toastService.show('A imagem deve ter no máximo 5MB.', 'error');
      input.value = '';
      return;
    }

    this.selectedFile = file;
    this.isImageLoading = true;

    const objectUrl = URL.createObjectURL(file);
    this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    this.isImageLoading = false;
  }

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    const fileInput = document.getElementById('photoUpload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  getInitials(): string {
    if (!this.formData.nome?.trim()) return '??';
    const parts = this.formData.nome.trim().split(' ').filter(p => p.length > 0);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  isFormValid(): boolean {
    return (
      this.formData.nome?.trim().length >= 2 &&
      !!this.formData.nascimento &&
      !!this.formData.genero
    );
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.toastService.show('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    const childData = {
      ...this.formData,
      name: this.formData.nome.trim(),
      photoUrl: this.selectedFile 
        ? URL.createObjectURL(this.selectedFile) 
        : this.childToEdit?.photoUrl,
      createdAt: this.isEditMode ? undefined : new Date().toISOString(),
    };

    if (this.isEditMode && this.editingId !== null) {
      this.childService.updateChild(this.editingId, childData);
      this.toastService.show('Criança atualizada com sucesso!', 'success');
    } else {
      this.childService.addChild(childData);
      this.toastService.show('Criança cadastrada com sucesso! Calendário vacinal gerado automaticamente.', 'success');
    }

    this.close();
  }

  close(): void {
    this.resetForm();
    this.closed.emit();
  }

  private resetForm(): void {
    this.formData = { nome: '', nascimento: '', genero: '' };
    this.imagePreview = null;
    this.selectedFile = null;
    this.isImageLoading = false;
    this.isEditMode = false;
    this.editingId = null;
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}