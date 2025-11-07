import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 benefits', () => {
    expect(component.benefits.length).toBe(6);
  });

  it('should emit getStarted event', () => {
    spyOn(component.getStarted, 'emit');
    const button = fixture.nativeElement.querySelector('.cta-btn');
    button.click();
    expect(component.getStarted.emit).toHaveBeenCalled();
  });

  it('should emit viewInstructors on benefit click', () => {
    spyOn(component.viewInstructors, 'emit');
    component.onBenefitClick('instructors');
    expect(component.viewInstructors.emit).toHaveBeenCalled();
  });

  it('should emit viewHandsOn on benefit click', () => {
    spyOn(component.viewHandsOn, 'emit');
    component.onBenefitClick('hands-on');
    expect(component.viewHandsOn.emit).toHaveBeenCalled();
  });

  it('should emit viewCertificates on benefit click', () => {
    spyOn(component.viewCertificates, 'emit');
    component.onBenefitClick('certificates');
    expect(component.viewCertificates.emit).toHaveBeenCalled();
  });

  it('should emit viewCareer on benefit click', () => {
    spyOn(component.viewCareer, 'emit');
    component.onBenefitClick('career');
    expect(component.viewCareer.emit).toHaveBeenCalled();
  });

  it('should emit viewFlexible on benefit click', () => {
    spyOn(component.viewFlexible, 'emit');
    component.onBenefitClick('flexible');
    expect(component.viewFlexible.emit).toHaveBeenCalled();
  });

  it('should emit viewCommunity on benefit click', () => {
    spyOn(component.viewCommunity, 'emit');
    component.onBenefitClick('community');
    expect(component.viewCommunity.emit).toHaveBeenCalled();
  });

  it('should display hero section', () => {
    const hero = fixture.nativeElement.querySelector('.hero');
    expect(hero).toBeTruthy();
  });

  it('should display hero title', () => {
    const title = fixture.nativeElement.querySelector('.hero h1');
    expect(title.textContent).toBe('Transform Your Tech Career');
  });

  it('should display benefit cards', () => {
    const benefits = fixture.nativeElement.querySelectorAll('.benefit');
    expect(benefits.length).toBe(6);
  });

  it('should display benefit icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('.icon');
    expect(icons.length).toBe(6);
  });
});
