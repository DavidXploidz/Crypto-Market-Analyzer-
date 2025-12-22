import { useTicker24hr } from "../hooks/useTicker24"
import CryptoCard from "../components/CryptoCard"
import Pagination from "../components/Pagination"
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

export default function HomeView() {
  const { ticker, loading: loadingTicker, pagination, handlePageChange, handleSearch } = useTicker24hr()
  console.log("🚀 ~ HomeView ~ ticker:", ticker)
  const [inputValue, setInputValue] = useState("")

  const onSearch = () => {
    handleSearch(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }
  
  return (
    <div className="min-h-dvh bg-dark">
        <div className="container mx-auto px-3 md:px-4 lg:px-6 py-10 min-h-full">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-light text-3xl lg:text-4xl font-bold font-space">Trending Assets</h2>
                <div className="flex items-center justify-between bg-primary p-2 rounded-xl border border-slate-800">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="w-full p-2 bg-transparent text-light outline-none"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button 
                        className="bg-accent hover:bg-accent/90 p-2 rounded-xl text-light hover:cursor-pointer"
                        onClick={onSearch}
                    >
                        <IoSearchOutline className="size-6" />
                    </button>
                </div>
            </div>
            {loadingTicker ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(20)].map((_, i) => <CryptoCard key={i} />)}
                </div>
            ) : (
                <>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ticker.map((item: any) => (
                            <CryptoCard key={item.symbol} ticker={item} />
                        ))}
                    </section>
                    {ticker.length === 0 && (
                        <p className="text-accent text-3xl font-bold text-center">No results found</p>
                    )}
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
