export interface Transaction {
  date: Date;
  type: String;
  ticker: String;
  amount: number;
  stockPrice: number;
  totalValue: number;
  remainingBalance: number;
}
