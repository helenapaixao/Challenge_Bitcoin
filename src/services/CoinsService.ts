/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface CoinsService {
  [x: string]: any;
  getCoinsMarketsList(query: string): Promise<any>;
  getCoinsById(id: string): Promise<any>;
  getCoinsHistoricalByDateAndTime(id: string, date: string, time: string): Promise<any>;
}
