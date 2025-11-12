import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterOptions {
  category: string;
  level: string;
  priceRange: { min: number; max: number };
  duration: string;
  rating: number;
}

@Component({
  selector: 'app-workshop-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filters-container">
      <h3>Filters</h3>

      <div class="filter-group">
        <label>Category</label>
        <select [(ngModel)]="filters.category" (change)="onFilterChange()">
          <option value="">All</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
          <option value="Mobile">Mobile</option>
          <option value="Data Science">Data Science</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Level</label>
        <select [(ngModel)]="filters.level" (change)="onFilterChange()">
          <option value="">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Price Range</label>
        <div class="price-inputs">
          <input
            type="number"
            placeholder="Min"
            [(ngModel)]="filters.priceRange.min"
            (change)="onFilterChange()"
          />
          <input
            type="number"
            placeholder="Max"
            [(ngModel)]="filters.priceRange.max"
            (change)="onFilterChange()"
          />
        </div>
      </div>

      <div class="filter-group">
        <label>Duration</label>
        <select [(ngModel)]="filters.duration" (change)="onFilterChange()">
          <option value="">Any Duration</option>
          <option value="short">Under 2 hours</option>
          <option value="medium">2-4 hours</option>
          <option value="long">Over 4 hours</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Minimum Rating</label>
        <select [(ngModel)]="filters.rating" (change)="onFilterChange()">
          <option value="0">Any Rating</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <button (click)="clearFilters()" class="clear-btn">Clear All</button>
    </div>
  `,
  styles: [
    `
      .filters-container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .filter-group {
        margin-bottom: 16px;
      }
      .filter-group label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: #374151;
      }
      .filter-group select,
      .filter-group input {
        width: 100%;
        padding: 8px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
      }
      .price-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .clear-btn {
        width: 100%;
        background: #6b7280;
        color: white;
        border: none;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
      }
      .clear-btn:hover {
        background: #4b5563;
      }
    `,
  ],
})
export class WorkshopFiltersComponent {
  filtersChange = output<FilterOptions>();

  filters: FilterOptions = {
    category: '',
    level: '',
    priceRange: { min: 0, max: 1000 },
    duration: '',
    rating: 0,
  };

  onFilterChange() {
    this.filtersChange.emit(this.filters);
  }

  clearFilters() {
    this.filters = {
      category: '',
      level: '',
      priceRange: { min: 0, max: 1000 },
      duration: '',
      rating: 0,
    };
    this.onFilterChange();
  }
}
