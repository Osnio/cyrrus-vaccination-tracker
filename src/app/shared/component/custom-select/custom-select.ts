import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-select.html',
  styleUrl: './custom-select.css',
})
export class CustomSelect {
  @Input() options: { label: string; value: string }[] = [];
  @Input() selectedValue: string = '';
  @Output() valueChange = new EventEmitter<string>();

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  selectOption(value: string) {
    this.selectedValue = value;
    this.valueChange.emit(value);
    this.isOpen = false;
  }
}