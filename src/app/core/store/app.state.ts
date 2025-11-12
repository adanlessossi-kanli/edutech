import { signal, computed } from '@angular/core';
import { Workshop, User } from '../models/workshop.model';

export interface AppState {
  user: User | null;
  workshops: Workshop[];
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  user: null,
  workshops: [],
  loading: false,
  error: null,
};

class Store {
  private state = signal<AppState>(initialState);

  readonly user = computed(() => this.state().user);
  readonly workshops = computed(() => this.state().workshops);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  setUser(user: User | null) {
    this.state.update((state) => ({ ...state, user }));
  }

  setWorkshops(workshops: Workshop[]) {
    this.state.update((state) => ({ ...state, workshops }));
  }

  setLoading(loading: boolean) {
    this.state.update((state) => ({ ...state, loading }));
  }

  setError(error: string | null) {
    this.state.update((state) => ({ ...state, error }));
  }
}

export const store = new Store();
