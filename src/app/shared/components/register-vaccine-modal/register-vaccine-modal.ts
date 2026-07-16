import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ChildService } from '../../../services/child.service';
import { ToastService } from './../../../services/toast.service';
import { Vaccine } from '../../models/child-detail.model';

@Component({
  selector: 'app-register-vaccine-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-vaccine-modal.html',
  styleUrl: './register-vaccine-modal.css',
})
export class RegisterVaccineModal implements OnInit, OnDestroy {
  @Input() childId!: number;
  @Input() vaccineIndex!: number;
  @Output() closed = new EventEmitter<void>();

  private destroy$ = new Subject<void>();
  isLoading = false;
  vaccine?: Vaccine;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private childService: ChildService,
    private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      data: [new Date().toISOString().split('T')[0], [Validators.required]],
      local: ['', [Validators.maxLength(80)]],
      observacoes: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    if (this.vaccineIndex !== undefined && this.vaccineIndex !== -1) {
      this.vaccine = this.childService.getVaccineByIndex(this.childId, this.vaccineIndex);
      
      if (!this.vaccine) {
        this.toastService.show('Vacina não encontrada.', 'error');
        this.close();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.isLoading) return;

    this.isLoading = true;

    const success = this.childService.registerVaccineApplication(this.childId, this.vaccineIndex, {
      applicationDate: this.registerForm.value.data,
      local: this.registerForm.value.local?.trim() || undefined,
      observacoes: this.registerForm.value.observacoes?.trim() || undefined
    });

    if (success) {
      this.toastService.show('Aplicação registrada com sucesso!', 'success');
      this.closed.emit();
    } else {
      this.toastService.show('Erro ao registrar aplicação.', 'error');
    }

    this.isLoading = false;
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('fixed')) this.close();
  }

  
}