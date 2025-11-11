import { TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOCALE_ID, useValue: 'en' }
      ]
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current locale', () => {
    expect(service.getCurrentLocale()).toBe('en');
  });

  it('should return supported locales', () => {
    expect(service.getSupportedLocales()).toEqual(['en', 'fr']);
  });

  it('should return language name', () => {
    expect(service.getLanguageName('en')).toBe('English');
    expect(service.getLanguageName('fr')).toBe('Français');
  });

  it('should not switch to unsupported language', () => {
    const originalHref = window.location.href;
    service.switchLanguage('de');
    expect(window.location.href).toBe(originalHref);
  });
});
