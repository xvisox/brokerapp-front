import {Injectable} from '@angular/core';
import {Stock} from "../trading/stock";

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() {
  }

  getStock(ticker: string): Stock | undefined {
    return window.localStorage.getItem(ticker) ? JSON.parse(window.localStorage.getItem(ticker)!) : undefined;
  }

  putStock(ticker: string, stock: Stock) {
    window.localStorage.setItem(ticker, JSON.stringify(stock));
  }

  clean() {
    window.localStorage.clear();
  }
}
