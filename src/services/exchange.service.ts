import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getExchangeInfo = async (): Promise<any> => {
  const endpoint = ENDPOINTS.EXCHANGE_INFO;

  const { data } = await api.get(endpoint);
  return data;
};
