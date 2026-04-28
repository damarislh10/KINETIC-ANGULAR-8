import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';
import { AppData, Service } from '../models/service.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  private data$?: Observable<AppData>;

  load(): Observable<AppData> {
    if (!this.data$) {
      this.data$ = this.http.get<AppData>('data/services.json').pipe(shareReplay(1));
    }
    return this.data$;
  }

  getServiceById(id: string): Observable<Service | undefined> {
    return this.load().pipe(map((d) => d.services.find((s) => s.id === id)));
  }
}
