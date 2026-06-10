import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'cc_token';
  private readonly USER_KEY = 'cc_user';

  constructor(private router: Router) {}

  // Simulación del login hasta conectar con el backend real
  login(email: string, password: string): boolean {
    if (email === 'admin@carrizal.com' && password === 'admin123') {
      const fakeToken = 'fake-jwt-token-admin';
      const fakeUser = { nombre: 'Administrador', rol: 'admin' };
      localStorage.setItem(this.TOKEN_KEY, fakeToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(fakeUser));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  getRol(): string {
    const user = this.getUser();
    return user?.rol ?? '';
  }
}