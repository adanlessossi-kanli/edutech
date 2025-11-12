import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexibleScheduleComponent } from './flexible-schedule.component';

describe('FlexibleScheduleComponent', () => {
  let component: FlexibleScheduleComponent;
  let fixture: ComponentFixture<FlexibleScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexibleScheduleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlexibleScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 features', () => {
    expect(component.features().length).toBe(6);
  });

  it('should display feature cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.feature-card');
    expect(cards.length).toBe(6);
  });

  it('should display page header', () => {
    const header = fixture.nativeElement.querySelector('.page-header h1');
    expect(header.textContent).toBe('Learn On Your Schedule');
  });

  it('should display learning formats', () => {
    const formats = fixture.nativeElement.querySelectorAll('.format');
    expect(formats.length).toBe(4);
  });

  it('should display format titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('.format h3');
    expect(titles[0].textContent).toBe('Video Lessons');
    expect(titles[1].textContent).toBe('Mobile Learning');
  });

  it('should display feature titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('.feature-card h3');
    expect(titles[0].textContent).toBe('Self-Paced Learning');
    expect(titles[1].textContent).toBe('Lifetime Access');
  });

  it('should display feature icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('.icon');
    expect(icons.length).toBe(6);
  });
});
