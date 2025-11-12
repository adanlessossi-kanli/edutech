import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

const requestCounts = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS = 100;
const TIME_WINDOW = 60000; // 1 minute

export const rateLimitGuard: CanActivateFn = (route) => {
  const path = route.routeConfig?.path || 'unknown';
  const now = Date.now();

  const record = requestCounts.get(path);

  if (!record || now > record.resetTime) {
    requestCounts.set(path, { count: 1, resetTime: now + TIME_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    console.warn('Rate limit exceeded for:', path);
    return false;
  }

  record.count++;
  return true;
};
