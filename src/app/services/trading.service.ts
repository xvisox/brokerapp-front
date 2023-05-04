import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";

const API_URL = 'http://localhost:8080/api/v1/transactions/'
const BUY = 'buy'
const SELL = 'sell'

@Injectable({
  providedIn: 'root'
})
export class TradingService {

  constructor(private http: HttpClient, private storage: StorageService) {
  }

  buyStock(stock: string, amount: number): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storage.getToken()
      }
    }
    return this.http.post(API_URL + BUY, {
      ticker: stock,
      amount: amount,
    }, httpOptions);
  }

  sellStock(stock: string, amount: number): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storage.getToken()
      }
    }
    return this.http.post(API_URL + SELL, {
      ticker: stock,
      amount: amount,
    }, httpOptions);
  }
}
