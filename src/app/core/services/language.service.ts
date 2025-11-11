import { Injectable, LOCALE_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLocale: string;
  private supportedLocales = ['en', 'fr'];

  constructor(@Inject(LOCALE_ID) locale: string) {
    this.currentLocale = locale;
  }

  getCurrentLocale(): string {
    return this.currentLocale;
  }

  getSupportedLocales(): string[] {
    return this.supportedLocales;
  }

  switchLanguage(locale: string): void {
    if (this.supportedLocales.includes(locale)) {
      const currentUrl = window.location.pathname;
      const baseUrl = window.location.origin;
      
      // Remove current locale from URL if present
      let newPath = currentUrl;
      this.supportedLocales.forEach(loc => {
        if (currentUrl.startsWith(`/${loc}/`)) {
          newPath = currentUrl.substring(loc.length + 1);
        }
      });
      
      // Add new locale to URL
      const newUrl = locale === 'en' 
        ? `${baseUrl}${newPath}` 
        : `${baseUrl}/${locale}${newPath}`;
      
      window.location.href = newUrl;
    }
  }

  getLanguageName(locale: string): string {
    const names: { [key: string]: string } = {
      'en': 'English',
      'fr': 'Français'
    };
    return names[locale] || locale;
  }
}
