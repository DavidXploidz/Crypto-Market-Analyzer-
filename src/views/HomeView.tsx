import { useTicker24hr } from "../hooks/useTicker24"
import CryptoCard from "../components/CryptoCard"
import Pagination from "../components/Pagination"
import { IoCloseOutline, IoSearchOutline, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { getKlines } from "../services/klines.service";
import HistoryChart from "../components/HistoryChart";

export default function HomeView() {
    const { ticker, loading: loadingTicker, pagination, handlePageChange, handleSearch, setCustomFilter, sortOrder, setSortOrder } = useTicker24hr()
    // console.log("🚀 ~ HomeView ~ ticker:", ticker)
    const [inputValue, setInputValue] = useState("")
    const [filterMode, setFilterMode] = useState("")
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const [openChartModal, setOpenChartModal] = useState(false);
    const [chartData, setChartData] = useState<any[]>([]);
    const [loadingChart, setLoadingChart] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState("");

    useEffect(() => {
        if (filterMode === "My Favorites") {
            setCustomFilter(() => (item: any) => favorites.includes(item.symbol));
        } else {
            setCustomFilter(null);
        }
    }, [filterMode, favorites, setCustomFilter]);

    const onSearch = () => {
        handleSearch(inputValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch()
        }
    }

    const openChartDetail = async (symbol: string) => {
        setOpenChartModal(true)
        setSelectedSymbol(symbol)
        setLoadingChart(true)
        try {
            const data = await getKlines(symbol)
            const formattedData = data.map((item: any) => ({
                time: new Date(item[0]).toLocaleDateString(),
                price: parseFloat(item[4])
            }))
            setChartData(formattedData)
        } catch (error) {
            console.error("Error fetching klines", error)
        } finally {
            setLoadingChart(false)
        }
    }

    return (
        <div className="min-h-dvh bg-dark">
            <AnimatePresence>
                {openChartModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpenChartModal(false)}
                            className="glass-effect fixed top-0 left-0 w-full h-full z-40 cursor-pointer"
                        />
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 w-full md:w-1/2 h-full bg-black/95 z-50 border-r border-slate-800 shadow-2xl"
                        >
                            <button className="absolute top-4 right-4 z-50" onClick={() => setOpenChartModal(false)}>
                                <IoClose className="size-10 flex-none text-light hover:text-accent transition-colors hover:cursor-pointer" />
                            </button>
                            <div className="p-3 md:p-4 lg:p-6 w-full h-full flex flex-col">
                                <h3 className="text-light text-3xl lg:text-4xl font-bold font-space text-center mb-6">
                                    {selectedSymbol} Chart History
                                </h3>
                                <span className="text-light text-xl text-center mb-5">(1h)</span>

                                {loadingChart ? (
                                    <div className="flex-1 grid place-items-center">
                                        <div className="size-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    <div className="flex-1 w-full bg-slate-900 rounded-xl p-4 overflow-hidden relative border border-slate-800">
                                        {chartData.length > 0 ? (
                                            <HistoryChart data={chartData} />
                                        ) : (
                                            <p className="text-slate-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                No data available
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <div className="container mx-auto px-3 md:px-4 lg:px-6 py-10 min-h-full">
                <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between mb-10">
                    <h2 className="text-light text-3xl lg:text-4xl font-bold font-space">Trending Assets</h2>
                    <div className="flex flex-col md:flex-row md:items-center gap-y-4 gap-x-2">
                        <select
                            name=""
                            id=""
                            className="bg-primary text-light min-h-14 p-2 rounded-xl border border-slate-800"
                            value={filterMode}
                            onChange={(e) => setFilterMode(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="My Favorites">My Favorites</option>
                        </select>
                        <select
                            className="bg-primary text-light min-h-14 p-2 rounded-xl border border-slate-800"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "")}
                        >
                            <option value="" disabled defaultValue={''}>Sort by Price</option>
                            <option value="desc">Price: High to Low</option>
                            <option value="asc">Price: Low to High</option>
                        </select>
                        <div className="flex items-center justify-between bg-primary p-2 rounded-xl border border-slate-800">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full p-2 bg-transparent text-light outline-none"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            {inputValue && (
                                <button className="p-2 rounded-xl text-light hover:cursor-pointer" onClick={() => setInputValue("")}>
                                    <IoCloseOutline className="size-6" />
                                </button>
                            )}
                            <button
                                className="bg-accent hover:bg-accent/90 p-2 rounded-xl text-light hover:cursor-pointer"
                                onClick={onSearch}
                            >
                                <IoSearchOutline className="size-6" />
                            </button>
                        </div>
                    </div>
                </div>
                {loadingTicker ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {[...Array(20)].map((_, i) => <CryptoCard key={i} />)}
                    </div>
                ) : (
                    <>
                        <motion.section
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                        >
                            <AnimatePresence mode="popLayout">
                                {ticker.map((item: any) => (
                                    <CryptoCard
                                        key={item.symbol}
                                        ticker={item}
                                        isFavorite={isFavorite(item.symbol)}
                                        onToggleFavorite={toggleFavorite}
                                        openChartDetail={openChartDetail}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.section>
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
