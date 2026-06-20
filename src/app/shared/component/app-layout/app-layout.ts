import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Brand } from './brand/brand';


@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    Brand
],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
})
export class AppLayout {
  @Input() title: string = '';
  @Input() subtitle?: string = '';
  @Input() actions?: any;

 

  nav = [
    { to: '/', label: 'Dashboard', icon: 'bi bi-grid' },
    { to: '/children', label: 'Crianças', icon: 'bi bi-emoji-smile' },
    { to: '/vaccines', label: 'Vacinas', icon: 'bi bi-eyedropper' },
    { to: '/campaigns', label: 'Campanhas', icon: 'bi bi-megaphone' },
    { to: '/reports', label: 'Relatórios', icon: 'bi bi-pie-chart-fill' },
  ];
}