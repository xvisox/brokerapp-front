import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Stock} from "./stock";
import {TradingService} from "../services/trading.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {stocks} from "./top50sp";
import {CacheService} from "../services/cache.service";

// Number of stocks to display per page
const FIRST_PAGE_SIZE = 10;
const PAGE_SIZE = 5;
// Listing stocks that we want to display
const API_URL = 'https://finnhub.io/api/v1/stock/profile2?symbol='
const KEY = '&token=ch79iihr01qt83gc52kgch79iihr01qt83gc52l0'
const CHART_URL_TEMPLATE = 'https://api.stockdio.com/visualization/financial/charts/v1/HistoricalPrices?app-key=00DE6A3F6826496FB44B1C3000635670&palette=Financial-Light&symbol=';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnInit {
  stocksDetails: Stock[] = [];
  ticker: string = '';
  chart: string = '';
  lastIdx: number = 0;
  form: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.min(1), Validators.required]),
    operation: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient, private tradingService: TradingService, private snackBar: MatSnackBar,
              private cache: CacheService) {
  }

  ngOnInit(): void {
    this.ticker = stocks[0]; // Default stock
    this.chart = CHART_URL_TEMPLATE + this.ticker;
    this.loadMoreStocks(FIRST_PAGE_SIZE);
  }

  loadMoreStocks(pages: number) {
    for (let i = 0; i < pages; i++) {
      this.pushStock();
    }
  }

  pushStock() {
    let ticker = stocks[this.lastIdx];
    let stock = this.cache.getStock(ticker);
    if (stock) {
      this.stocksDetails.push(stock);
    } else {
      this.http.get(API_URL + ticker + KEY).subscribe((data: any) => {
        let fetchedStock = {
          logo: data.logo,
          name: data.name,
          ticker: data.ticker
        }
        this.stocksDetails.push(fetchedStock);
        this.cache.putStock(ticker, fetchedStock);
      });
    }
    this.lastIdx++;
  }

  showStock(stock: string) {
    this.ticker = stock;
    this.chart = CHART_URL_TEMPLATE + this.ticker;
  }

  submit() {
    if (this.form.valid) {
      if (this.form.value.operation === 'buy') {
        this.buyStock();
      } else if (this.form.value.operation === 'sell') {
        this.sellStock();
      } else {
        console.log('Invalid operation')
      }
    }
  }

  buyStock() {
    if (this.form.valid) {
      this.tradingService.buyStock(this.ticker, Number(this.form.value.amount)).subscribe({
        next: data => {
          this.snackBar.open(data.message, "Close");
        },
        error: err => {
          this.snackBar.open(err.error.message, "Close");
        }
      });
    }
  }

  sellStock() {
    if (this.form.valid) {
      this.tradingService.sellStock(this.ticker, Number(this.form.value.amount)).subscribe({
        next: data => {
          this.snackBar.open(data.message, "Close");
        },
        error: err => {
          this.snackBar.open(err.error.message, "Close");
        }
      });
    }
  }

  protected readonly PAGE_SIZE = PAGE_SIZE;
}
