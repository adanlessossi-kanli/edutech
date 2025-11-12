import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workshop } from '../models/workshop.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  private http = inject(HttpClient);
  private apiUrl = '/api/workshops';
  private workshops = signal<Workshop[]>([]);
  private loaded = false;

  getWorkshops() {
    if (!this.loaded) {
      this.http
        .get<Workshop[]>(this.apiUrl)
        .pipe(
          tap((workshops) => {
            this.workshops.set(workshops);
            this.loaded = true;
          }),
        )
        .subscribe();
    }
    return this.workshops.asReadonly();
  }

  getWorkshopById(id: string) {
    return this.workshops().find((w) => w.id === id);
  }

  searchWorkshops(query: string) {
    return this.workshops().filter(
      (w) =>
        w.title.toLowerCase().includes(query.toLowerCase()) ||
        w.category.toLowerCase().includes(query.toLowerCase()) ||
        w.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
    );
  }

  addWorkshop(workshop: Workshop) {
    this.workshops.update((workshops) => [...workshops, workshop]);
  }

  enrollUser(workshopId: string, _userId: string): boolean {
    const workshop = this.getWorkshopById(workshopId);
    if (workshop && workshop.currentParticipants < workshop.maxParticipants) {
      this.workshops.update((workshops) =>
        workshops.map((w) =>
          w.id === workshopId ? { ...w, currentParticipants: w.currentParticipants + 1 } : w,
        ),
      );
      return true;
    }
    return false;
  }
}
