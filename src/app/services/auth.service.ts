import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, LoginCredentials } from '../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private readonly DEMO_USERS: User[] = [
    {
      id: 1,
      nome: "Admin Geral",
      email: "admin@cyrrus.health",
      role: "admin"
    },
    {
      id: 2,
      nome: "Carla Mendes",
      email: "carla@cyrrus.health",
      role: "gestor"
    }
  ];

  constructor() {
    // Recuperar sessão ao iniciar
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginCredentials): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = this.DEMO_USERS.find(u => u.email === credentials.email);

      if (!user || credentials.password !== this.getDemoPassword(user.email)) {
        reject(new Error("Credenciais inválidas."));
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      resolve(user);
    });
  }

  private getDemoPassword(email: string): string {
    if (email === "admin@cyrrus.health") return "Admin@2026";
    if (email === "carla@cyrrus.health") return "Gestor@2026";
    return "";
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  
}