import { getTicker24hr } from "../services/ticker.service";
import { useEffect, useState } from "react";
import type { Pagination } from "../types/pagination.types";

export const useTicker24hr = () => {
  const [data, setData] = useState<any[]>([]); // Full dataset
  const [ticker, setTicker] = useState<any[]>([]); // Paginated data
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getTicker24hr()
      .then((responseData) => {
        setData(responseData);
      })
      .finally(() => setLoading(false));
  }, []);

  const [customFilter, setCustomFilter] = useState<((item: any) => boolean) | null>(null);

  useEffect(() => {
    // Filter data first
    let filteredData = data;
    if (searchTerm) {
      filteredData = data.filter((item) =>
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (customFilter) {
      filteredData = filteredData.filter(customFilter);
    }

    // Then paginate
    if (filteredData.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setTicker(filteredData.slice(startIndex, endIndex));
    } else {
      setTicker([]);
    }
  }, [data, currentPage, itemsPerPage, searchTerm, customFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Calculate pagination based on filtered data count
  let filteredCount = data.length;

  if (searchTerm) {
    filteredCount = data.filter((item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    ).length;
  }

  if (customFilter) {
    // If we have a custom filter, we need to calculate count based on that too.
    // Ideally we chain filters.
    let tempFiltered = data;
    if (searchTerm) {
      tempFiltered = tempFiltered.filter((item) =>
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    tempFiltered = tempFiltered.filter(customFilter);
    filteredCount = tempFiltered.length;
  }

  const pagination: Pagination = {
    total: filteredCount,
    per_page: itemsPerPage,
    current_page: currentPage,
    last_page: Math.ceil(filteredCount / itemsPerPage),
    from: (currentPage - 1) * itemsPerPage + 1,
    to: Math.min(currentPage * itemsPerPage, filteredCount),
  };

  return {
    ticker,
    loading,
    pagination,
    handlePageChange,
    handleSearch,
    setCustomFilter,
  };
};
