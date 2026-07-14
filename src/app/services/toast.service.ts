import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private container: HTMLElement | null = null;

  show(message: string, type: 'success' | 'error' = 'success') {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
      document.body.appendChild(this.container);
    }

    const toast = document.createElement('div');
    const bg = type === 'success' ? 'bg-(--dark)' : 'bg-red-500';
    
    toast.className = `px-6 py-4 rounded-3xl shadow-xl text-white flex items-center gap-3 min-w-[280px] ${bg} animate-slide-in`;
    toast.innerHTML = `
      <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-x-circle'}"></i>
      <span class="font-medium">${message}</span>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}