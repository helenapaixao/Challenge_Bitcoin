/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface SimpleService {
  getSimplePrice(query: string): Promise<any>;
}
