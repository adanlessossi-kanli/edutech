import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HandsOnLearningComponent } from './hands-on-learning.component';

describe('HandsOnLearningComponent', () => {
  let component: HandsOnLearningComponent;
  let fixture: ComponentFixture<HandsOnLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandsOnLearningComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HandsOnLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 projects', () => {
    expect(component.projects().length).toBe(6);
  });

  it('should display project cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.project-card');
    expect(cards.length).toBe(6);
  });

  it('should display page header', () => {
    const header = fixture.nativeElement.querySelector('.page-header h1');
    expect(header.textContent).toBe('Learn By Building Real Projects');
  });

  it('should display features section', () => {
    const features = fixture.nativeElement.querySelectorAll('.feature');
    expect(features.length).toBe(3);
  });

  it('should display project titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('.project-card h3');
    expect(titles[0].textContent).toBe('E-Commerce Platform');
    expect(titles[1].textContent).toBe('Social Media Dashboard');
  });

  it('should display tech tags', () => {
    const tags = fixture.nativeElement.querySelectorAll('.tech-tag');
    expect(tags.length).toBeGreaterThan(0);
  });

  it('should display project icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('.project-icon');
    expect(icons.length).toBe(6);
  });
});
