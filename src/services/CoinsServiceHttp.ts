/* eslint-disable @typescript-eslint/no-explicit-any */
import type HttpClient from '~/infra/HttpClient';
import type CoinsService from './CoinsService';

export default class CoinsServiceHttp implements CoinsService {
  constructor(readonly httpClient: HttpClient) {}

  async getCoinsById(id: string) {
    const response = await this.httpClient.get(`coins/${id}`);
    return response;
  }

  async getCoinsHistoricalByDateAndTime(id: string, date: string, time: string) {
    const response = await this.httpClient.get(`coins/${id}/history?date=${date}&time=${time}`);
    return response;
  }

  async getCoinsMarketsList(query: string) {
    const response = await this.httpClient.get(`coins/markets?${query}`);
    return response;
  }
}
