export interface CryptoCardProps {
  ticker?: {
    symbol: string;
    lastPrice: string;
    priceChangePercent: string;
    quoteVolume: string;
  };
  isFavorite?: boolean;
  onToggleFavorite?: (symbol: string) => void;
  openChartDetail?: (symbol: string) => void;
}
