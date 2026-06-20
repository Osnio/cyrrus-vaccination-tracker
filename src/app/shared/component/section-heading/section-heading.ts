import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-heading',
  imports: [CommonModule],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.css',
})
export class SectionHeading {
  @Input() title!: string;
  @Input() description?: string;
  @Input() action?: any;
  @Input() className?: string;

}
