/* eslint-disable @typescript-eslint/no-explicit-any */
import type HttpClient from '~/infra/HttpClient';
import type SimpleService from './SimpleService';

export default class SimpleServiceHttp implements SimpleService {
  constructor(readonly httpClient: HttpClient) {}

  async getSimplePrice(query: string): Promise<any> {
    const response = await this.httpClient.get(`simple/price?${query}`);
    return response;
  }
}
