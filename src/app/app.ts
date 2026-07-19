import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { AuthService } from './services/auth.service'; 
import { ToastService } from './services/toast.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  userDropdownOpen = false;
  sidebarOpen = false;
  isLoggingOut = false;
  isAuthenticated = false;

  private destroy$ = new Subject<void>();


  // currentUser: any = null;        // Para mostrar nome e role
  nav = [
    { to: '/dashboard', label: 'Início', icon: 'bi bi-grid', roles: ['admin', 'gestor'] },
    { to: '/children', label: 'Crianças', icon: 'bi bi-emoji-smile', roles: ['admin', 'gestor'] },
    { to: '/vaccines', label: 'Vacinas', icon: 'bi bi-eyedropper', roles: ['admin', 'gestor'] },
    { to: '/campaigns', label: 'Campanhas', icon: 'bi bi-megaphone', roles: ['admin', 'gestor'] },
    { to: '/reports', label: 'Relatórios', icon: 'bi bi-pie-chart-fill', roles: ['admin', 'gestor'] },
    { to: '/activities', label: 'Atividades', icon: 'bi bi-clock-history', roles: ['admin'] }, // Só Admin
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService:ToastService
  ) {}

ngOnInit() {
    this.setSidebarState(window.innerWidth);

    // Observa mudanças de autenticação
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.isAuthenticated = !!user;
      
      // Se não estiver autenticado e não estiver na página de login → redireciona
      if (!this.isAuthenticated && !this.router.url.includes('/login')) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setSidebarState(event.target.innerWidth);
  }

 setSidebarState(width: number) {
    this.sidebarOpen = width >= 992;
  }

  get isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url.startsWith('/login?');
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get filteredNav() {
    const user = this.currentUser;
    if (!user) return [];
    return this.nav.filter(item => item.roles.includes(user.role));
  }

  toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

logout(): void {
    if (this.isLoggingOut) return;

    this.isLoggingOut = true;

    setTimeout(() => {
      this.authService.logout();           // ← Chama o método do AuthService
      this.isLoggingOut = false;
      this.userDropdownOpen = false;
    }, 600);
  }

showComingSoon(feature: string): void {
  this.toastService.show(`${feature} estará disponível brevemente.`,);
}
}