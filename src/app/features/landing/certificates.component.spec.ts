import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificatesComponent } from './certificates.component';

describe('CertificatesComponent', () => {
  let component: CertificatesComponent;
  let fixture: ComponentFixture<CertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 certificates', () => {
    expect(component.certificates().length).toBe(6);
  });

  it('should display certificate cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.certificate-card');
    expect(cards.length).toBe(6);
  });

  it('should display page header', () => {
    const header = fixture.nativeElement.querySelector('.page-header h1');
    expect(header.textContent).toBe('Earn Industry-Recognized Certificates');
  });

  it('should display benefits section', () => {
    const benefits = fixture.nativeElement.querySelectorAll('.benefit');
    expect(benefits.length).toBe(3);
  });

  it('should display certificate names', () => {
    const names = fixture.nativeElement.querySelectorAll('.certificate-card h3');
    expect(names[0].textContent).toBe('Full Stack Web Developer');
    expect(names[1].textContent).toBe('Cloud Solutions Architect');
  });

  it('should display skill badges', () => {
    const badges = fixture.nativeElement.querySelectorAll('.skill-badge');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('should display certificate icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('.cert-icon');
    expect(icons.length).toBe(6);
  });
});
