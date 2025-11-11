import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { WorkshopListComponent } from './features/workshops/workshop-list.component';
import { AuthComponent } from './features/auth/auth.component';
import { AdminWorkshopFormComponent } from './features/admin/admin-workshop-form.component';
import { UserDashboardComponent } from './features/dashboard/user-dashboard.component';
import { LandingComponent } from './features/landing/landing.component';
import { InstructorsComponent } from './features/landing/instructors.component';
import { HandsOnLearningComponent } from './features/landing/hands-on-learning.component';
import { CertificatesComponent } from './features/landing/certificates.component';
import { CareerSupportComponent } from './features/landing/career-support.component';
import { FlexibleScheduleComponent } from './features/landing/flexible-schedule.component';
import { CommunityComponent } from './features/landing/community.component';
import { AuthService } from './core/services/auth.service';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, WorkshopListComponent, AuthComponent, AdminWorkshopFormComponent, UserDashboardComponent, LandingComponent, InstructorsComponent, HandsOnLearningComponent, CertificatesComponent, CareerSupportComponent, FlexibleScheduleComponent, CommunityComponent, LanguageSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('EduTech Pro');
  private authService = inject(AuthService);
  private location = inject(Location);
  
  currentView = signal<'landing' | 'workshops' | 'instructors' | 'hands-on' | 'certificates' | 'career' | 'flexible' | 'community' | 'admin' | 'auth' | 'dashboard'>('landing');

  ngOnInit() {
    window.addEventListener('popstate', () => {
      const path = this.location.path().slice(1) || 'landing';
      this.currentView.set(path as any);
    });
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.currentView.set('workshops');
  }

  showAdmin() {
    this.navigate('admin');
  }

  private navigate(view: string) {
    this.currentView.set(view as any);
    this.location.go('/' + view);
  }

  showLanding() {
    this.navigate('landing');
  }

  showWorkshops() {
    this.navigate('workshops');
  }

  showInstructors() {
    this.navigate('instructors');
  }

  showHandsOn() {
    this.navigate('hands-on');
  }

  showCertificates() {
    this.navigate('certificates');
  }

  showCareer() {
    this.navigate('career');
  }

  showFlexible() {
    this.navigate('flexible');
  }

  showCommunity() {
    this.navigate('community');
  }

  showAuth() {
    this.navigate('auth');
  }

  showDashboard() {
    this.navigate('dashboard');
  }
}
