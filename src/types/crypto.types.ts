export interface CryptoCardProps {
    ticker?: {
        symbol: string;
        lastPrice: string;
        priceChangePercent: string;
        quoteVolume: string;
    }
}