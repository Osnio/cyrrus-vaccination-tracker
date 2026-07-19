export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  role: 'admin' | 'gestor';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}