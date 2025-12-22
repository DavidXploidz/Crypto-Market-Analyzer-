import type { CryptoCardProps } from "../types/crypto.types";
import { IoArrowUpOutline, IoArrowDownOutline, IoStar, IoStarOutline } from "react-icons/io5";
import { FaMicrochip } from "react-icons/fa6";

export default function CryptoCard({ ticker, isFavorite, onToggleFavorite }: CryptoCardProps) {
    if (!ticker) return <div className='bg-primary border border-slate-800 text-light min-h-40 rounded-2xl p-2 md:p-3 lg:p-4 space-y-4 animate-pulse'></div>

    return (
        <div className='bg-primary border border-slate-800 text-light min-h-40 rounded-2xl p-2 md:p-3 lg:p-4 space-y-4 hover:border-slate-600 transition-colors'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-2'>
                    <div className="w-10 h-10 grid place-items-center bg-accent/70 rounded-full">
                        <FaMicrochip className='size-5' />
                    </div>
                    <p className='font-semibold font-inter text-lg'>{ticker.symbol}</p>
                </div>
                <div>
                    {isFavorite
                        ?
                        <IoStar onClick={() => onToggleFavorite && onToggleFavorite(ticker.symbol)} className="size-6 cursor-pointer transition-colors text-yellow-400 fill-yellow-400" />
                        :
                        <IoStarOutline onClick={() => onToggleFavorite && onToggleFavorite(ticker.symbol)} className="size-6 cursor-pointer transition-colors hover:text-yellow-400" />
                    }
                </div>
            </div>
            <p className="text-3xl xl:text-4xl font-bold font-roboto">${parseFloat(ticker.lastPrice).toLocaleString()}</p>
            <div className="flex items-center justify-between gap-x-2 font-roboto">
                <p className={parseFloat(ticker.priceChangePercent) >= 0 ? "text-green-500" : "text-red-500"}>
                    {parseFloat(ticker.priceChangePercent) >= 0 ? (
                        <IoArrowUpOutline className="inline-block size-4" />
                    ) : (
                        <IoArrowDownOutline className="inline-block size-4" />
                    )}
                    {ticker.priceChangePercent}%
                </p>
                <p className="text-slate-500">Vol. {parseFloat(ticker.quoteVolume).toFixed(2)}</p>
            </div>
        </div>
    )
}
