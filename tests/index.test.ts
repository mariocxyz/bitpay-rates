import nock from 'nock';

import { get } from '../src';

describe('Get all rates', () => {
  beforeEach(() => {
    nock('https://bitpay.com')
      .persist()
      .get('/rates')
      .reply(200, {
        data: []
      });
  });

  test('using promises', async () => {
    const rates: any = await get();
    expect(typeof rates).toEqual('object');
    expect(Array.isArray(rates)).toBe(true);
  });

  test('using callback', () => {
    get((err: any, rates) => {
      expect(typeof rates).toEqual('object');
      expect(Array.isArray(rates)).toBe(true);
    });
  });
});

describe('Get a rate by code', () => {
  const code = 'ARS';

  beforeEach(() => {
    nock('https://bitpay.com')
      .persist()
      .get(`/rates/${code}`)
      .reply(200, {
        data: {
          code
        }
      });
  });

  test('using promises', async () => {
    const rate: any = await get(code);
    expect(typeof rate).toEqual('object');
    expect(rate.code).toEqual(code);
  });

  test('using callback', () => {
    get(code, (err: any, rate: any) => {
      expect(typeof rate).toEqual('object');
      expect(rate.code).toEqual(code);
    });
  });
});
