import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { PortfolioItem } from './portfolioItem';
import { StockDetail } from './stockDetail';
import { CacheService } from '../services/cache.service';
import { Stock } from '../trading/stock';

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
      next: (data) => {
        this.portfolioItems = data.portfolio;
        this.stockDetails = this.portfolioItems.map((item) => {
          const stock: Stock | undefined = this.cacheService.getStock(
            item.ticker
          );
          return stock
            ? { logo: stock.logo, name: stock.name }
            : { logo: '', name: '' };
        });
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
