import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkshopFiltersComponent } from './workshop-filters.component';

describe('WorkshopFiltersComponent', () => {
  let component: WorkshopFiltersComponent;
  let fixture: ComponentFixture<WorkshopFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter changes', () => {
    spyOn(component.filtersChange, 'emit');
    component.onFilterChange();
    expect(component.filtersChange.emit).toHaveBeenCalled();
  });

  it('should clear filters', () => {
    component.filters.category = 'Frontend';
    component.clearFilters();
    expect(component.filters.category).toBe('');
  });
});
