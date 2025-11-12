import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner', () => {
    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner).toBeTruthy();
  });

  it('should apply medium size by default', () => {
    const container = fixture.nativeElement.querySelector('.spinner-container.spinner-medium');
    expect(container).toBeTruthy();
  });

  it('should apply small size', () => {
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.spinner-container.spinner-small');
    expect(container).toBeTruthy();
  });

  it('should display message when provided', () => {
    fixture.componentRef.setInput('message', 'Loading...');
    fixture.detectChanges();
    const message = fixture.nativeElement.querySelector('.spinner-message');
    expect(message.textContent).toBe('Loading...');
  });

  it('should not display message when not provided', () => {
    const message = fixture.nativeElement.querySelector('.spinner-message');
    expect(message).toBeFalsy();
  });
});
