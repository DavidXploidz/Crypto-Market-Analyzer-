import { CiStar } from "react-icons/ci";
import { FaBitcoin } from "react-icons/fa";

interface CryptoCardProps {
    ticker?: {
        symbol: string;
        lastPrice: string;
        priceChangePercent: string;
        quoteVolume: string;
    }
}

export default function CryptoCard({ ticker }: CryptoCardProps) {
    if (!ticker) return <div className='bg-primary border border-slate-800 text-light min-h-40 rounded-2xl p-2 md:p-3 lg:p-4 space-y-4 animate-pulse'></div>

  return (
    <div className='bg-primary border border-slate-800 text-light min-h-40 rounded-2xl p-2 md:p-3 lg:p-4 space-y-4 hover:border-slate-600 transition-colors'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
                <FaBitcoin className='flex-none size-12 text-yellow-500' />
                <p className='font-semibold'>{ticker.symbol}</p>
            </div>
            <div>
                <CiStar className="size-6 cursor-pointer hover:text-yellow-400" />
            </div>
        </div>
        <p className="text-3xl font-bold">${parseFloat(ticker.lastPrice).toLocaleString()}</p>
        <div className="flex items-center justify-between gap-x-2">
            <p className={parseFloat(ticker.priceChangePercent) >= 0 ? "text-green-500" : "text-red-500"}>
                {ticker.priceChangePercent}%
            </p>
            <p className="text-slate-500">Vol. {parseFloat(ticker.quoteVolume).toFixed(2)}</p>
        </div>
    </div>
  )
}
