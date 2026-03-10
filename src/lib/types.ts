export interface PricePoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockResponse {
  stockId: string;
  codename: string;
  prices: PricePoint[];
  targetDate: string;
}

export interface PredictionResponse {
  id: string;
  stockId: string;
  stockCodename: string;
  predictedPrice: number;
  direction: 'UP' | 'DOWN';
  basePrice: number;
  targetDate: string;
  submittedAt: string;
  status: 'PENDING' | 'RESOLVED';
}