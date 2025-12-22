import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getTicker24hr = async (): Promise<any> => {
  const endpoint = ENDPOINTS.TICKER_24HR;

  const { data } = await api.get(endpoint);
  return data;
};
