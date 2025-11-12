import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-switcher">
      <select
        [value]="languageService.getCurrentLocale()"
        (change)="onLanguageChange($event)"
        class="language-select"
        aria-label="Select language"
      >
        @for (locale of languageService.getSupportedLocales(); track locale) {
          <option [value]="locale">
            {{ languageService.getLanguageName(locale) }}
          </option>
        }
      </select>
    </div>
  `,
  styles: [
    `
      .language-switcher {
        display: inline-block;
      }

      .language-select {
        padding: 0.5rem 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
      }

      .language-select:hover {
        border-color: #007bff;
      }

      .language-select:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
      }
    `,
  ],
})
export class LanguageSwitcherComponent {
  languageService = inject(LanguageService);

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.languageService.switchLanguage(target.value);
  }
}
