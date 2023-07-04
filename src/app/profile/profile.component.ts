import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { PortfolioItem } from './portfolioItem';
import { StockDetail } from './stockDetail';
import { CacheService } from '../services/cache.service';
import { Stock } from '../trading/stock';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const FINNHUB_API_URL = 'https://finnhub.io/api/v1/stock/profile2?symbol='
const FINNHUB_API_KEY = '&token=ch79iihr01qt83gc52kgch79iihr01qt83gc52l0'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string = 'anonymous';
  balance: number = 0;
  portfolioItems: PortfolioItem[] = [];
  stockDetails: StockDetail[] = [];

  protected readonly NUMBER_FORMAT: string = '1.2-2';

  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private cacheService: CacheService
  ) {}

  private getUserData(): void {
    this.profileService.getUserData().subscribe({
      next: (data) => {
        this.username = data.username;
        this.balance = data.balance;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  private getPortfolio(): void {
    this.profileService.getPortfolio().subscribe({
      next: async (data) => {
        this.portfolioItems = data.portfolio;
        let response = this.portfolioItems.map(async (item) => {
          const stock: Stock | undefined = this.cacheService.getStock(
            item.ticker
          );
          if (stock) {
            return { logo: stock.logo, name: stock.name };
          } else {
            let response: any = await firstValueFrom(this.http.get(FINNHUB_API_URL + item.ticker + FINNHUB_API_KEY));
            let fetchedStock: Stock = {
              logo: response.logo,
              name: response.name,
              ticker: response.ticker
            }
            this.cacheService.putStock(item.ticker, fetchedStock);
            return { logo: fetchedStock.logo, name: fetchedStock.name };
          }
        });
        this.stockDetails = await Promise.all(response);
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  ngOnInit() {
    this.getUserData();
    this.getPortfolio();
  }
}
