import { getTicker24hr } from "../services/ticker.service";
import { useEffect, useState } from "react";
import type { Pagination } from "../types/pagination.types";

export const useTicker24hr = () => {
  const [data, setData] = useState<any[]>([]); // Full dataset
  const [ticker, setTicker] = useState<any[]>([]); // Paginated data
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    getTicker24hr()
      .then((responseData) => {
        setData(responseData);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setTicker(data.slice(startIndex, endIndex));
    }
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pagination: Pagination = {
    total: data.length,
    per_page: itemsPerPage,
    current_page: currentPage,
    last_page: Math.ceil(data.length / itemsPerPage),
    from: (currentPage - 1) * itemsPerPage + 1,
    to: Math.min(currentPage * itemsPerPage, data.length),
  };

  return { ticker, loading, pagination, handlePageChange };
};
