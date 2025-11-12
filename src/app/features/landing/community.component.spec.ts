import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityComponent } from './community.component';

describe('CommunityComponent', () => {
  let component: CommunityComponent;
  let fixture: ComponentFixture<CommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityComponent);
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
    expect(header.textContent).toBe('Join Our Global Community');
  });

  it('should display stats section', () => {
    const stats = fixture.nativeElement.querySelectorAll('.stat');
    expect(stats.length).toBe(3);
  });

  it('should display correct stat values', () => {
    const statValues = fixture.nativeElement.querySelectorAll('.stat h3');
    expect(statValues[0].textContent).toBe('50K+');
    expect(statValues[1].textContent).toBe('150+');
    expect(statValues[2].textContent).toBe('24/7');
  });

  it('should display feature titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('.feature-card h3');
    expect(titles[0].textContent).toBe('Discussion Forums');
    expect(titles[1].textContent).toBe('Study Groups');
  });

  it('should display feature icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('.icon');
    expect(icons.length).toBe(6);
  });
});
