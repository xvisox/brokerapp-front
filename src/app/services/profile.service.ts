import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

const USERS_API_URL = 'http://localhost:8080/api/v1/users/';
const TRANSACTIONS_API_URL = 'http://localhost:8080/api/v1/transactions/';

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
}
