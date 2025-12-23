import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getKlines = async (symbol: string): Promise<any> => {
  const endpoint = ENDPOINTS.KLINES;

  const { data } = await api.get(endpoint, {
    params: {
      symbol,
      interval: "1h",
      limit: 100
    }
  });
  return data;
};
