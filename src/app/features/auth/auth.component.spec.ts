import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthService } from '../../core/services/auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register']);

    await TestBed.configureTestingModule({
      imports: [AuthComponent, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle between login and register modes', () => {
    expect(component.isLogin()).toBe(true);
    
    component.toggleMode();
    expect(component.isLogin()).toBe(false);
    
    component.toggleMode();
    expect(component.isLogin()).toBe(true);
  });

  it('should call login service on login submit', () => {
    component.email = 'test@example.com';
    component.password = 'password';
    authService.login.and.returnValue(true);

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should call register service on register submit', () => {
    component.isLogin.set(false);
    component.email = 'test@example.com';
    component.password = 'password';
    component.name = 'Test User';
    authService.register.and.returnValue(true);

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith('test@example.com', 'password', 'Test User');
  });

  it('should display correct form title', () => {
    fixture.detectChanges();
    let title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toBe('Login');

    component.toggleMode();
    fixture.detectChanges();
    title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toBe('Register');
  });

  it('should show name field only in register mode', () => {
    fixture.detectChanges();
    let nameField = fixture.nativeElement.querySelector('input[placeholder="Full Name"]');
    expect(nameField).toBeFalsy();

    component.toggleMode();
    fixture.detectChanges();
    nameField = fixture.nativeElement.querySelector('input[placeholder="Full Name"]');
    expect(nameField).toBeTruthy();
  });
});
