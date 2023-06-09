import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { Transaction } from './transaction';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  historicalTransactions: Transaction[] = [];
  columnsToDisplay: string[] = [
    'date',
    'type',
    'ticker',
    'amount',
    'stockPrice',
    'totalValue',
    'remainingBalance',
  ];

  protected readonly DATE_FORMAT: string = 'dd/MM/yyyy HH:mm:ss';
  protected readonly TIME_ZONE: string = 'UTC +2';
  protected readonly NUMBER_FORMAT: string = '1.2-2';

  constructor(private historyService: HistoryService) {}

  private getHistoricalTransactions(): void {
    this.historyService.getHistoricalTransactions().subscribe({
      next: (data) => {
        this.historicalTransactions = data.history;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  ngOnInit(): void {
    this.getHistoricalTransactions();
  }
}
