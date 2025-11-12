import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../../core/services/workshop.service';
import { WorkshopCardComponent } from './workshop-card.component';
import { WorkshopFiltersComponent, FilterOptions } from './workshop-filters.component';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-workshop-list',
  standalone: true,
  imports: [CommonModule, FormsModule, WorkshopCardComponent, WorkshopFiltersComponent],
  template: `
    <div class="workshop-list-container">
      <div class="header">
        <h1>Tech Workshops</h1>
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="Search workshops..." 
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
            class="search-input">
        </div>
      </div>
      
      <div class="filters">
        <select [(ngModel)]="selectedCategory" (change)="onFilterChange()" class="filter-select">
          <option value="">All</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
          <option value="Mobile">Mobile</option>
          <option value="Data Science">Data Science</option>
        </select>
        
        <select [(ngModel)]="selectedLevel" (change)="onFilterChange()" class="filter-select">
          <option value="">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        
        <button (click)="resetFilters()" class="reset-filters-btn">Reset Filters</button>
      </div>

      <div class="content-layout">
        <aside class="filters-sidebar">
          <app-workshop-filters (filtersChange)="onFiltersChange($event)"></app-workshop-filters>
        </aside>
        
        <div class="workshops-main">
          @if (apiService.getLoading()()) {
            <div class="loading">Loading workshops...</div>
          } @else {
            <div class="workshops-grid">
              @for (workshop of filteredWorkshops(); track workshop.id) {
                <app-workshop-card [workshop]="workshop"></app-workshop-card>
              }
              @empty {
                <p class="no-results">No workshops found matching your criteria.</p>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .workshop-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #333;
      margin: 0;
    }
    .search-input {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 300px;
      font-size: 16px;
    }
    .filters {
      display: flex;
      gap: 16px;
      margin-bottom: 30px;
    }
    .filter-select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
    }
    .reset-filters-btn {
      padding: 8px 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #6b7280;
      color: white;
      cursor: pointer;
    }
    .reset-filters-btn:hover {
      background: #4b5563;
    }
    .content-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 30px;
      align-items: start;
    }
    .filters-sidebar {
      position: sticky;
      top: 20px;
    }
    .workshops-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
    }
    .loading {
      text-align: center;
      padding: 40px;
      color: #6b7280;
      font-size: 18px;
    }
    @media (max-width: 1024px) {
      .content-layout {
        grid-template-columns: 1fr;
      }
      .filters-sidebar {
        position: static;
      }
    }
    .no-results {
      text-align: center;
      color: #666;
      font-size: 18px;
      margin: 40px 0;
    }
  `]
})
export class WorkshopListComponent {
  private workshopService = inject(WorkshopService);
  protected apiService = inject(ApiService);
  
  searchQuery = signal('');
  selectedCategory = signal('');
  selectedLevel = signal('');
  filteredWorkshops = signal(this.workshopService.getWorkshops()());
  currentFilters = signal<FilterOptions | null>(null);

  async ngOnInit() {
    try {
      const workshops = await this.apiService.getWorkshops();
      if (workshops && workshops.length > 0) {
        this.filteredWorkshops.set(workshops);
      } else {
        this.loadWorkshops();
      }
    } catch (error) {
      console.error('Failed to load workshops:', error);
      this.loadWorkshops();
    }
  }

  loadWorkshops() {
    this.filteredWorkshops.set(this.workshopService.getWorkshops()());
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  onFiltersChange(filters: FilterOptions) {
    this.currentFilters.set(filters);
    this.applyFilters();
  }

  private applyFilters() {
    let workshops = this.workshopService.getWorkshops()();
    
    if (this.searchQuery()) {
      workshops = this.workshopService.searchWorkshops(this.searchQuery());
    }
    
    const filters = this.currentFilters();
    if (filters) {
      if (filters.category) {
        workshops = workshops.filter(w => w.category === filters.category);
      }
      if (filters.level) {
        workshops = workshops.filter(w => w.level === filters.level);
      }
      if (filters.priceRange.min > 0 || filters.priceRange.max < 1000) {
        workshops = workshops.filter(w => 
          w.price >= filters.priceRange.min && w.price <= filters.priceRange.max
        );
      }
      if (filters.duration) {
        workshops = workshops.filter(w => {
          if (filters.duration === 'short') return w.duration < 120;
          if (filters.duration === 'medium') return w.duration >= 120 && w.duration <= 240;
          if (filters.duration === 'long') return w.duration > 240;
          return true;
        });
      }
    }
    
    this.filteredWorkshops.set(workshops);
  }

  resetFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('');
    this.selectedLevel.set('');
    this.currentFilters.set(null);
    this.applyFilters();
  }
}