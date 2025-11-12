import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdminWorkshopFormComponent } from './admin-workshop-form.component';
import { WorkshopService } from '../../core/services/workshop.service';

describe('AdminWorkshopFormComponent', () => {
  let component: AdminWorkshopFormComponent;
  let fixture: ComponentFixture<AdminWorkshopFormComponent>;
  let workshopService: jasmine.SpyObj<WorkshopService>;

  beforeEach(async () => {
    const workshopServiceSpy = jasmine.createSpyObj('WorkshopService', ['addWorkshop']);

    await TestBed.configureTestingModule({
      imports: [AdminWorkshopFormComponent, FormsModule],
      providers: [{ provide: WorkshopService, useValue: workshopServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminWorkshopFormComponent);
    component = fixture.componentInstance;
    workshopService = TestBed.inject(WorkshopService) as jasmine.SpyObj<WorkshopService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.title).toBe('');
    expect(component.description).toBe('');
    expect(component.instructor).toBe('');
    expect(component.duration).toBe(0);
    expect(component.price).toBe(0);
  });

  it('should submit workshop form', () => {
    component.title = 'Test Workshop';
    component.description = 'Test Description';
    component.instructor = 'Test Instructor';
    component.duration = 120;
    component.price = 99;
    component.category = 'Frontend';
    component.level = 'Beginner';
    component.maxParticipants = 20;
    component.startDate = '2024-01-01T10:00';
    component.endDate = '2024-01-01T12:00';
    component.tagsInput = 'test, workshop';

    component.onSubmit();

    expect(workshopService.addWorkshop).toHaveBeenCalled();
    const addedWorkshop = workshopService.addWorkshop.calls.mostRecent().args[0];
    expect(addedWorkshop.title).toBe('Test Workshop');
    expect(addedWorkshop.tags).toEqual(['test', 'workshop']);
  });

  it('should reset form after submission', () => {
    component.title = 'Test Workshop';
    component.description = 'Test Description';

    component.onSubmit();

    expect(component.title).toBe('');
    expect(component.description).toBe('');
  });

  it('should display all form fields', () => {
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input');
    const textareas = fixture.nativeElement.querySelectorAll('textarea');
    const selects = fixture.nativeElement.querySelectorAll('select');

    expect(inputs.length).toBeGreaterThan(5);
    expect(textareas.length).toBe(1);
    expect(selects.length).toBe(2);
  });

  it('should have category options', () => {
    fixture.detectChanges();

    const categorySelect = fixture.nativeElement.querySelector('select[name="category"]');
    const options = categorySelect.querySelectorAll('option');

    expect(options.length).toBeGreaterThan(1);
    expect(Array.from(options).some((opt: any) => opt.textContent === 'Frontend')).toBe(true);
  });

  it('should have level options', () => {
    fixture.detectChanges();

    const levelSelect = fixture.nativeElement.querySelector('select[name="level"]');
    const options = levelSelect.querySelectorAll('option');

    expect(options.length).toBeGreaterThan(1);
    expect(Array.from(options).some((opt: any) => opt.textContent === 'Beginner')).toBe(true);
  });

  it('should parse tags correctly', () => {
    component.tagsInput = 'react, javascript, frontend';
    component.onSubmit();

    const addedWorkshop = workshopService.addWorkshop.calls.mostRecent().args[0];
    expect(addedWorkshop.tags).toEqual(['react', 'javascript', 'frontend']);
  });
});
