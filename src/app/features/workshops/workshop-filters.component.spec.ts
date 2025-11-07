import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WorkshopFiltersComponent } from './workshop-filters.component';

describe('WorkshopFiltersComponent', () => {
  let component: WorkshopFiltersComponent;
  let fixture: ComponentFixture<WorkshopFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopFiltersComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopFiltersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default filters', () => {
    expect(component.filters.category).toBe('');
    expect(component.filters.level).toBe('');
    expect(component.filters.priceRange.min).toBe(0);
    expect(component.filters.priceRange.max).toBe(1000);
    expect(component.filters.duration).toBe('');
    expect(component.filters.rating).toBe(0);
  });

  it('should emit filter changes', () => {
    spyOn(component.filtersChange, 'emit');
    
    component.onFilterChange();
    
    expect(component.filtersChange.emit).toHaveBeenCalledWith(component.filters);
  });

  it('should clear all filters', () => {
    component.filters.category = 'Frontend';
    component.filters.level = 'Advanced';
    component.filters.rating = 5;
    
    spyOn(component.filtersChange, 'emit');
    
    component.clearFilters();
    
    expect(component.filters.category).toBe('');
    expect(component.filters.level).toBe('');
    expect(component.filters.rating).toBe(0);
    expect(component.filtersChange.emit).toHaveBeenCalled();
  });

  it('should display all filter options', () => {
    fixture.detectChanges();
    
    const categorySelect = fixture.nativeElement.querySelector('select');
    const options = categorySelect.querySelectorAll('option');
    
    expect(options.length).toBeGreaterThan(1);
    expect(options[0].textContent).toBe('All Categories');
  });

  it('should update filters when form values change', () => {
    fixture.detectChanges();
    
    const categorySelect = fixture.nativeElement.querySelector('select');
    categorySelect.value = 'Frontend';
    categorySelect.dispatchEvent(new Event('change'));
    
    expect(component.filters.category).toBe('Frontend');
  });

  it('should have price range inputs', () => {
    fixture.detectChanges();
    
    const priceInputs = fixture.nativeElement.querySelectorAll('.price-inputs input');
    expect(priceInputs.length).toBe(2);
    expect(priceInputs[0].placeholder).toBe('Min');
    expect(priceInputs[1].placeholder).toBe('Max');
  });
});