import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text skeleton by default', () => {
    const element = fixture.nativeElement;
    expect(element.classList.contains('skeleton-text')).toBeTruthy();
  });

  it('should render title skeleton', () => {
    component.type = 'title';
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.classList.contains('skeleton-title')).toBeTruthy();
  });

  it('should apply custom width', () => {
    component.width = '200px';
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.style.width).toBe('200px');
  });

  it('should apply custom height', () => {
    component.height = '100px';
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.style.height).toBe('100px');
  });
});
