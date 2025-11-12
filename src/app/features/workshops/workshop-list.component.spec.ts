import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { WorkshopListComponent } from './workshop-list.component';
import { WorkshopService } from '../../core/services/workshop.service';
import { ApiService } from '../../core/services/api.service';
import { Workshop } from '../../core/models/workshop.model';

describe('WorkshopListComponent', () => {
  let component: WorkshopListComponent;
  let fixture: ComponentFixture<WorkshopListComponent>;
  let workshopService: jasmine.SpyObj<WorkshopService>;
  let apiService: jasmine.SpyObj<ApiService>;

  const mockWorkshops: Workshop[] = [
    {
      id: '1',
      title: 'React Workshop',
      description: 'Learn React',
      instructor: 'John Doe',
      duration: 120,
      price: 99,
      category: 'Frontend',
      level: 'Beginner',
      maxParticipants: 20,
      currentParticipants: 5,
      startDate: new Date(),
      endDate: new Date(),
      tags: ['React', 'JavaScript'],
      isLive: false,
    },
  ];

  beforeEach(async () => {
    const workshopServiceSpy = jasmine.createSpyObj('WorkshopService', [
      'getWorkshops',
      'searchWorkshops',
    ]);
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getWorkshops',
      'getLoading',
      'getError',
    ]);

    await TestBed.configureTestingModule({
      imports: [WorkshopListComponent, FormsModule],
      providers: [
        { provide: WorkshopService, useValue: workshopServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy },
      ],
    }).compileComponents();

    workshopService = TestBed.inject(WorkshopService) as jasmine.SpyObj<WorkshopService>;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    workshopService.getWorkshops.and.returnValue(signal(mockWorkshops));
    workshopService.searchWorkshops.and.returnValue(mockWorkshops);
    apiService.getLoading.and.returnValue(signal(false));
    apiService.getError.and.returnValue(signal(null));
    apiService.getWorkshops.and.returnValue(Promise.resolve(mockWorkshops));

    fixture = TestBed.createComponent(WorkshopListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load workshops on init', async () => {
    await component.ngOnInit();

    expect(apiService.getWorkshops).toHaveBeenCalled();
    expect(component.filteredWorkshops().length).toBe(1);
  });

  it('should apply search filters', () => {
    workshopService.searchWorkshops.and.returnValue(mockWorkshops);
    component.searchQuery.set('React');

    component.onSearch();

    expect(workshopService.searchWorkshops).toHaveBeenCalledWith('React');
  });

  it('should apply category filters', () => {
    const filters = {
      category: 'Frontend',
      level: '',
      priceRange: { min: 0, max: 1000 },
      duration: '',
      rating: 0,
    };

    component.onFiltersChange(filters);

    expect(component.currentFilters()).toEqual(filters);
  });

  it('should filter by price range', () => {
    const filters = {
      category: '',
      level: '',
      priceRange: { min: 50, max: 150 },
      duration: '',
      rating: 0,
    };

    component.onFiltersChange(filters);

    const filtered = component.filteredWorkshops();
    expect(filtered.every((w) => w.price >= 50 && w.price <= 150)).toBe(true);
  });

  it('should filter by duration', () => {
    const shortWorkshop = { ...mockWorkshops[0], duration: 60 };
    workshopService.getWorkshops.and.returnValue(signal([shortWorkshop]));

    const filters = {
      category: '',
      level: '',
      priceRange: { min: 0, max: 1000 },
      duration: 'short',
      rating: 0,
    };

    component.onFiltersChange(filters);

    const filtered = component.filteredWorkshops();
    expect(filtered.every((w) => w.duration < 120)).toBe(true);
  });

  it('should show loading state', () => {
    apiService.getLoading.and.returnValue(signal(true));
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.loading');
    expect(loadingElement).toBeTruthy();
    expect(loadingElement.textContent).toContain('Loading workshops...');
  });

  it('should display workshops when not loading', () => {
    component.filteredWorkshops.set(mockWorkshops);
    fixture.detectChanges();

    const workshopCards = fixture.nativeElement.querySelectorAll('app-workshop-card');
    expect(workshopCards.length).toBe(1);
  });

  it('should show no results message when no workshops match', () => {
    component.filteredWorkshops.set([]);
    fixture.detectChanges();

    const noResults = fixture.nativeElement.querySelector('.no-results');
    expect(noResults).toBeTruthy();
    expect(noResults.textContent).toContain('No workshops found');
  });
});
