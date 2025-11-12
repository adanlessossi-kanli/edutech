import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CareerSupportComponent } from './career-support.component';

describe('CareerSupportComponent', () => {
  let component: CareerSupportComponent;
  let fixture: ComponentFixture<CareerSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerSupportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CareerSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 services', () => {
    expect(component.services().length).toBe(6);
  });

  it('should display service cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.service-card');
    expect(cards.length).toBe(6);
  });

  it('should display page header', () => {
    const header = fixture.nativeElement.querySelector('.page-header h1');
    expect(header.textContent).toBe('Advance Your Tech Career');
  });

  it('should display stats section', () => {
    const stats = fixture.nativeElement.querySelectorAll('.stat');
    expect(stats.length).toBe(3);
  });

  it('should display correct stat values', () => {
    const statValues = fixture.nativeElement.querySelectorAll('.stat h3');
    expect(statValues[0].textContent).toBe('85%');
    expect(statValues[1].textContent).toBe('$95K');
    expect(statValues[2].textContent).toBe('500+');
  });

  it('should display service icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('.icon');
    expect(icons.length).toBe(6);
  });

  it('should display service titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('.service-card h3');
    expect(titles[0].textContent).toBe('Resume Review');
    expect(titles[1].textContent).toBe('Interview Prep');
  });
});
