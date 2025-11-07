import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressTrackerComponent } from './progress-tracker.component';
import { Progress } from '../../core/models/enhanced.model';

describe('ProgressTrackerComponent', () => {
  let component: ProgressTrackerComponent;
  let fixture: ComponentFixture<ProgressTrackerComponent>;

  const mockProgress: Progress[] = [
    {
      id: '1',
      userId: '1',
      workshopId: '1',
      completionPercentage: 75,
      lastAccessed: new Date(),
      certificateIssued: false
    },
    {
      id: '2',
      userId: '1',
      workshopId: '2',
      completionPercentage: 100,
      lastAccessed: new Date(),
      certificateIssued: true
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressTrackerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressTrackerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display progress items', () => {
    fixture.componentRef.setInput('userProgress', mockProgress);
    fixture.detectChanges();
    
    const progressItems = fixture.nativeElement.querySelectorAll('.progress-item');
    expect(progressItems.length).toBe(2);
  });

  it('should show correct completion percentage', () => {
    fixture.componentRef.setInput('userProgress', mockProgress);
    fixture.detectChanges();
    
    const percentages = fixture.nativeElement.querySelectorAll('.progress-percentage');
    expect(percentages[0].textContent).toBe('75%');
    expect(percentages[1].textContent).toBe('100%');
  });

  it('should display progress bars with correct width', () => {
    fixture.componentRef.setInput('userProgress', mockProgress);
    fixture.detectChanges();
    
    const progressFills = fixture.nativeElement.querySelectorAll('.progress-fill');
    expect(progressFills[0].style.width).toBe('75%');
    expect(progressFills[1].style.width).toBe('100%');
  });

  it('should show certificate badge for completed workshops', () => {
    fixture.componentRef.setInput('userProgress', mockProgress);
    fixture.detectChanges();
    
    const certificateBadges = fixture.nativeElement.querySelectorAll('.certificate-badge');
    expect(certificateBadges.length).toBe(1);
    expect(certificateBadges[0].textContent).toContain('Certificate Earned');
  });

  it('should show download button for completed workshops without certificate', () => {
    const progressWithoutCert = [{
      ...mockProgress[1],
      certificateIssued: false
    }];
    fixture.componentRef.setInput('userProgress', progressWithoutCert);
    fixture.detectChanges();
    
    const downloadBtn = fixture.nativeElement.querySelector('.certificate-btn');
    expect(downloadBtn).toBeTruthy();
    expect(downloadBtn.textContent).toContain('Download Certificate');
  });

  it('should not show download button for incomplete workshops', () => {
    fixture.componentRef.setInput('userProgress', [mockProgress[0]]);
    fixture.detectChanges();
    
    const downloadBtn = fixture.nativeElement.querySelector('.certificate-btn');
    expect(downloadBtn).toBeFalsy();
  });

  it('should get workshop title correctly', () => {
    const title = component.getWorkshopTitle('1');
    expect(title).toBe('Advanced React Patterns');
    
    const unknownTitle = component.getWorkshopTitle('999');
    expect(unknownTitle).toBe('Unknown Workshop');
  });

  it('should download certificate', () => {
    spyOn(window.URL, 'createObjectURL').and.returnValue('blob:url');
    spyOn(window.URL, 'revokeObjectURL');
    
    const mockProgress = {
      id: '1',
      userId: '1',
      workshopId: '1',
      completionPercentage: 100,
      lastAccessed: new Date(),
      certificateIssued: false
    };
    
    component.downloadCertificate(mockProgress);
    
    expect(mockProgress.certificateIssued).toBe(true);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
  });

  it('should show no progress message when empty', () => {
    fixture.componentRef.setInput('userProgress', []);
    fixture.detectChanges();
    
    const noProgress = fixture.nativeElement.querySelector('.no-progress');
    expect(noProgress).toBeTruthy();
    expect(noProgress.textContent).toContain('No enrolled workshops yet');
  });

  it('should display last accessed date', () => {
    fixture.componentRef.setInput('userProgress', mockProgress);
    fixture.detectChanges();
    
    const lastAccessed = fixture.nativeElement.querySelectorAll('.last-accessed');
    expect(lastAccessed.length).toBe(2);
    expect(lastAccessed[0].textContent).toContain('Last accessed:');
  });
});
