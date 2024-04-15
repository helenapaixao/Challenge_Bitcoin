/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import type HttpClient from './HttpClient';

const API_URL = 'https://api.coingecko.com/api/v3';

export default class AxiosAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const httpConfig = { method: 'get' };
    return await this.axiosConfig(url, httpConfig);
  }

  private async axiosConfig(url: string, httpConfig: any): Promise<any> {
    try {
      const config = {
        ...httpConfig,
      };
      const response = await axios(`${API_URL}/${url}`, config);
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
}
