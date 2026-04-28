import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'kinetic:favoriteServiceIds';
const TEAM_KEY = 'kinetic:favoriteTeamIds';

function readIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]): void {
  localStorage.setItem(key, JSON.stringify([...new Set(ids)]));
}

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  readonly serviceIds = signal<string[]>(readIds(STORAGE_KEY));
  readonly teamIds = signal<string[]>(readIds(TEAM_KEY));

  isFavoriteService(id: string): boolean {
    return this.serviceIds().includes(id);
  }

  toggleService(id: string): boolean {
    const current = [...this.serviceIds()];
    const i = current.indexOf(id);
    if (i === -1) current.push(id);
    else current.splice(i, 1);
    writeIds(STORAGE_KEY, current);
    this.serviceIds.set(current);
    return i === -1;
  }

  isFavoriteTeam(id: string): boolean {
    return this.teamIds().includes(id);
  }

  toggleTeam(id: string): boolean {
    const current = [...this.teamIds()];
    const i = current.indexOf(id);
    if (i === -1) current.push(id);
    else current.splice(i, 1);
    writeIds(TEAM_KEY, current);
    this.teamIds.set(current);
    return i === -1;
  }
}
