export type Trade = {
  id: string;
  date: string;
  market: 'XAUUSD' | 'USDJPY';
  setup: 'SA1' | 'Fibs';
  profitLoss: number;
  rulesFollowed: boolean;
  notes?: string;
};

export type TradeStats = {
  totalPL: number;
  winRate: number;
  totalTrades: number;
  rulesFollowedRate: number;
};