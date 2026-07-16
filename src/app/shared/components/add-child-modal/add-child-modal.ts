import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ChildService } from '../../../services/child.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-add-child-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-child-modal.html',
  styleUrl: './add-child-modal.css',
})
export class AddChildModal implements OnChanges {
  @Output() closed = new EventEmitter<void>();
  @Input() childToEdit: any = null;

  @Input() isClosing = false;
  isEditMode = false;
  editingId: number | null = null;

  formData = {
    nome: '',
    nascimento: '',
    genero: '',
    idade: 'Nova criança'
  };

  imagePreview: SafeUrl | null = null;
  selectedFile: File | null = null;
  isImageLoading = false;

  constructor(
    private childService: ChildService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer
  ) {}

ngOnChanges(changes: SimpleChanges) {
    if (changes['childToEdit'] && this.childToEdit) {
      this.isEditMode = true;
      this.editingId = this.childToEdit.id;

      this.formData = {
        nome: this.childToEdit.nome || this.childToEdit.name || '',
        nascimento: this.childToEdit.nascimento || '',
        genero: this.childToEdit.genero || '',
        idade: this.childToEdit.idade || ''
      };

      if (this.childToEdit.photoUrl) {
        this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(this.childToEdit.photoUrl);
      } else {
        this.imagePreview = null;
      }
      this.selectedFile = null;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      this.toastService.show('A imagem deve ter no máximo 5MB', 'error');
      return;
    }

    this.selectedFile = file;
    this.isImageLoading = true;

    const objectUrl = URL.createObjectURL(file);
    this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    this.isImageLoading = false;
  }

  removeImage() {
    this.imagePreview = null;
    this.selectedFile = null;
  }

  getInitials(): string {
    if (!this.formData.nome?.trim()) return '??';
    const parts = this.formData.nome.trim().split(' ').filter(p => p.length > 0);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  isFormValid(): boolean {
    return this.formData.nome?.trim().length >= 3 && 
           !!this.formData.nascimento && 
           !!this.formData.genero;
  }

  onSubmit() {
    if (!this.isFormValid()) return;

    const childData = {
      ...this.formData,
      name: this.formData.nome,
      photoUrl: this.selectedFile ? URL.createObjectURL(this.selectedFile) : this.childToEdit?.photoUrl,
      createdAt: this.isEditMode ? undefined : new Date().toISOString()
    };

    if (this.isEditMode && this.editingId !== null) {
      this.childService.updateChild(this.editingId, childData);
      this.toastService.show('Criança atualizada com sucesso!');
    } else {
      this.childService.addChild(childData);
      this.toastService.show('Criança cadastrada com sucesso!');
    }

    this.close();
  }

  close() {
    this.resetForm();
    this.closed.emit();
  }

  private resetForm() {
    this.formData = { nome: '', nascimento: '', genero: '', idade: 'Nova criança' };
    this.imagePreview = null;
    this.selectedFile = null;
    this.isImageLoading = false;
  }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('fixed')) this.close();
  }
}