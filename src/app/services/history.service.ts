import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

const HISTORY_API_URL = 'http://localhost:8080/api/v1/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getHistoricalTransactions(): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      },
    };
    return this.http.get(HISTORY_API_URL, httpOptions);
  }
}
