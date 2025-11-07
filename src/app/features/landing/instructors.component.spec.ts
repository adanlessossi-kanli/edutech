import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstructorsComponent } from './instructors.component';

describe('InstructorsComponent', () => {
  let component: InstructorsComponent;
  let fixture: ComponentFixture<InstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 instructors', () => {
    expect(component.instructors().length).toBe(6);
  });

  it('should display instructor cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.instructor-card');
    expect(cards.length).toBe(6);
  });

  it('should display page header', () => {
    const header = fixture.nativeElement.querySelector('.page-header h1');
    expect(header.textContent).toBe('Meet Our Expert Instructors');
  });

  it('should display instructor names', () => {
    const names = fixture.nativeElement.querySelectorAll('.instructor-card h3');
    expect(names[0].textContent).toBe('Sarah Johnson');
    expect(names[1].textContent).toBe('Michael Chen');
  });

  it('should display instructor titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('.title');
    expect(titles[0].textContent).toBe('Senior Frontend Developer');
  });

  it('should display instructor stats', () => {
    const stats = fixture.nativeElement.querySelectorAll('.stats');
    expect(stats.length).toBe(6);
  });

  it('should display skill tags', () => {
    const tags = fixture.nativeElement.querySelectorAll('.skill-tag');
    expect(tags.length).toBeGreaterThan(0);
  });

  it('should display instructor avatars', () => {
    const avatars = fixture.nativeElement.querySelectorAll('.instructor-avatar');
    expect(avatars.length).toBe(6);
  });
});
