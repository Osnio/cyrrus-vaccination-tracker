import { Component, signal, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import { Router, RouterOutlet } from '@angular/router';
import { VaccinationService } from './services/vaccination.service';

// import { Component,  } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
// import { FormBuilder } from '@angular/forms';
// import { NotificationToastComponent } from './components/notification-toast/notification-toast.component';
import { NgIf } from '@angular/common';
import { Brand } from "./shared/component/app-layout/brand/brand";
// import { NotificationComponent } from "./notification/notification.component";
// import { Notification } from './notification/notification.component';
// import { WalletService } from './services/wallet.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Brand],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('cyrrus-vaccination-tracker');
  sidebarOpen = false;
  userName = 'cyrrus-vaccination-tracker'; 
  userDropdownOpen = false;
  isMobile = window.innerWidth < 992;

  showSidebar = false;
  selectedNotifications: any = null;
  sidebarVisible = false;

  notifications: Notification[] = [];

  nav = [
    { to: '/dashboard', label: 'Início', icon: 'bi bi-grid' },
    { to: '/children', label: 'Crianças', icon: 'bi bi-emoji-smile' },
    { to: '/vaccines', label: 'Vacinas', icon: 'bi bi-eyedropper' },
    { to: '/campaigns', label: 'Campanhas', icon: 'bi bi-megaphone' },
    { to: '/reports', label: 'Relatórios', icon: 'bi bi-pie-chart-fill' },
  ];


  constructor(
    private vaccinationService: VaccinationService,
    private fb: FormBuilder, 
    private router: Router
  ) {}

  ngOnInit() {
    this.setSidebarState(window.innerWidth);
    this.isMobile = window.innerWidth < 992;

    // this.loadVerificationNotifications();
  }
  

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setSidebarState(event.target.innerWidth);
    this.isMobile = event.target.innerWidth < 992;
  }

  setSidebarState(width: number) {
    this.sidebarOpen = width >= 992;
  }

  toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  get isLoginPage() {
    return this.router.url === '/login';
  }

  // --------------------------------
  // loadVerificationNotifications() {
  //   this.vaccinationService.getVerifications().subscribe(res => {

  //     const readIds = this.getReadNotifications();

  //     const verificationNotifications: Notification[] = res.items.map((item: any) => {

  //       const storeName = item.seller?.businessInfo?.storeName || 'Empresa';

  //       return {
  //         id: item.id,
  //         type: 'verification',
  //         title: 'Solicitação de Verificação',
  //         message: `A empresa ${storeName} solicitou que a loja seja verificada pela BayQi.`,
  //         time: this.formatTime(item.createdAt),
  //         read: readIds.includes(item.id),
  //         link: `/companie/${item.sellerId}`
  //       };

  //     });

  //     this.notifications = verificationNotifications;

  //   });
  // }



  formatTime(date: string): string {
    const now = new Date();
    const created = new Date(date);

    const diff = Math.floor((now.getTime() - created.getTime()) / 60000);

    if (diff < 1) return 'Agora mesmo';
    if (diff < 60) return `Há ${diff} minutos`;

    const hours = Math.floor(diff / 60);
    if (hours < 24) return `Há ${hours} horas`;

    const days = Math.floor(hours / 24);
    return `Há ${days} dias`;
  }

  // openNotifications(transaction: any) {
  //   this.selectedNotifications = transaction;
  //   this.sidebarVisible = true;

  //   const readIds = this.notifications.map(n => n.id);

  //   this.notifications.forEach(n => n.read = true);

  //   this.saveReadNotifications(readIds);

  //   setTimeout(() => {
  //     this.showSidebar = true;
  //   }, 10);
  // }


  closeNotifications() {
    this.showSidebar = false;    // inicia animação de desaparecer
    this.selectedNotifications = null;

    setTimeout(() => {
      this.sidebarVisible = false; // remove do DOM depois da animação (300ms)
    }, 300);
  }

  // toggleNotifications() {
  //   if (this.showSidebar) {
  //     this.closeNotifications();
  //   } else {
  //     this.openNotifications(null);
  //   }
  // }

  // get notificationCount(): number {
  //   return this.notifications.filter(n => !n.read).length;
  // }

  // getReadNotifications(): string[] {
  //   const stored = localStorage.getItem('readNotifications');
  //   return stored ? JSON.parse(stored) : [];
  // }
  
  // saveReadNotifications(ids: string[]) {
  //   localStorage.setItem('readNotifications', JSON.stringify(ids));
  // }
  
}
