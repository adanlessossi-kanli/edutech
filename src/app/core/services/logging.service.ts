import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private logLevels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  private shouldLog(level: LogLevel): boolean {
    const configLevel = environment.logLevel as LogLevel;
    return this.logLevels[level] >= this.logLevels[configLevel];
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${message}`, data || '');
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, data || '');
    }
  }

  error(message: string, data?: any): void {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, data || '');
      this.sendToMonitoring(message, data);
    }
  }

  private sendToMonitoring(message: string, data?: any): void {
    if (environment.production && environment.thirdParty.sentryDsn) {
      // Send to monitoring service (Sentry, CloudWatch, etc.)
      // Implementation would go here
    }
  }
}
