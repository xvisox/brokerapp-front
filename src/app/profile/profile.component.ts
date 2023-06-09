import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { PortfolioItem } from './portfolioItem';
import { StockDetail } from './stockDetail';
import { Observable, forkJoin } from 'rxjs';

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

  constructor(private profileService: ProfileService) {}

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
        const detailsObservables: Observable<any>[] = this.portfolioItems.map(
          (portfolioItem) =>
            this.profileService.getStockDetails(portfolioItem.ticker)
        );
        forkJoin(detailsObservables).subscribe((responses) => {
          responses.forEach((response) => {
            this.stockDetails.push({
              logo: response.logo,
              name: response.name,
            });
          });
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
