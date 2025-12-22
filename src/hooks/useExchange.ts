import { getExchangeInfo } from "../services/exchange.service";
import { useEffect, useState } from "react";

export const useExchange = () => {
  const [exchange, setExchange] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExchangeInfo()
      .then(setExchange)
      .finally(() => setLoading(false));
  }, []);

  return { exchange, loading };
};
