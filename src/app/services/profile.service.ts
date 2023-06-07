import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

const USERS_API_URL = 'http://localhost:8080/api/v1/users/';
const TRANSACTIONS_API_URL = 'http://localhost:8080/api/v1/transactions/';
const FINNHUB_API_URL = 'https://finnhub.io/api/v1/stock/profile2?symbol=';
const KEY = '&token=ch79iihr01qt83gc52kgch79iihr01qt83gc52l0';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getUserData(): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      },
    };
    return this.http.get(USERS_API_URL + 'profile', httpOptions);
  }

  getPortfolio(): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      },
    };
    return this.http.get(TRANSACTIONS_API_URL + 'portfolio', httpOptions);
  }

  getStockDetails(ticker: string): Observable<any> {
    return this.http.get(FINNHUB_API_URL + ticker + KEY);
  }
}
