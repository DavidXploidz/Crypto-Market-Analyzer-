import { useTicker24hr } from "../hooks/useTicker24"
import CryptoCard from "../components/CryptoCard"
import Pagination from "../components/Pagination"

export default function HomeView() {
  const { ticker, loading: loadingTicker, pagination, handlePageChange } = useTicker24hr()
  
  return (
    <div className="min-h-dvh bg-dark">
        <div className="container mx-auto px-3 md:px-4 lg:px-6 py-10 min-h-full">
            <h2 className="text-light text-2xl lg:text-3xl font-bold mb-10">Trending Assets</h2>
            {loadingTicker ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => <CryptoCard key={i} />)}
                </div>
            ) : (
                <>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ticker.map((item: any) => (
                            <CryptoCard key={item.symbol} ticker={item} />
                        ))}
                    </section>
                    {pagination && (
                        <Pagination 
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    </div>
  )
}
