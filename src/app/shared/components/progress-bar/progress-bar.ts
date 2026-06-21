// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-progress-bar',
//   imports: [CommonModule],
//   templateUrl: './progress-bar.html',
//   styleUrl: './progress-bar.css',
//   template: `
//     <div class="w-full">
//       <div class="h-2 w-full rounded-full bg-muted overflow-hidden">
//         <div 
//           class="h-full rounded-full transition-all" 
//           [class]="getColorClass()"
//           [style.width.%]="value">
//         </div>
//       </div>
//       @if (showLabel) {
//         <div class="mt-1 flex justify-between text-[11px] text-muted-foreground">
//           <span>Progresso</span>
//           <span class="font-semibold text-foreground">{{ value }}%</span>
//         </div>
//       }
//     </div>
//   `
// })
// export class ProgressBar {
//   @Input() value: number = 0;
//   @Input() tone: 'primary' | 'secondary' | 'accent' = 'primary';
//   @Input() showLabel = false;

//   getColorClass() {
//     const colors: any = {
//       primary: 'bg-primary',
//       secondary: 'bg-secondary',
//       accent: 'bg-accent',
//     };
//     return colors[this.tone] || 'bg-primary';
//   }
// }
