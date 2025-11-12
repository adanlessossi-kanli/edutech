import { Injectable, signal } from '@angular/core';
import { User } from '../models/workshop.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(this.loadUserFromStorage());
  private isAuthenticated = signal(this.loadUserFromStorage() !== null);

  getCurrentUser() {
    return this.currentUser.asReadonly();
  }

  isLoggedIn() {
    return this.isAuthenticated.asReadonly();
  }

  login(email: string, password: string): boolean {
    // Mock authentication
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'student',
      enrolledWorkshops: [],
      completedWorkshops: []
    };
    
    this.currentUser.set(mockUser);
    this.isAuthenticated.set(true);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    return true;
  }

  register(email: string, password: string, name: string): boolean {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'student',
      enrolledWorkshops: [],
      completedWorkshops: []
    };
    
    this.currentUser.set(newUser);
    this.isAuthenticated.set(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('currentUser');
  }

  private loadUserFromStorage(): User | null {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }
}