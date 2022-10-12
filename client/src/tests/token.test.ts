import { describe, expect, afterAll, test, jest } from '@jest/globals';
import { providers } from 'ethers';
import { config } from '../config';
import { fetchTokenData } from '../helpers';

describe('token functions', () => {
  test('should fetch token data', async () => {
    let path = [
      '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      '0xb0e4bf42afafa3ed6b6a76557ab34e97d1ee83d4',
    ];

    let provider = new providers.JsonRpcProvider(config.JSON_RPC);

    let [token0, token1] = await fetchTokenData(provider, path);

    expect(token0.decimals).toBe(18);
    expect(token0.symbol).toBe('WBNB');
    expect(token0.name).toBe('Wrapped BNB');

    expect(token1.decimals).toBe(9);
    expect(token1.symbol).toBe('PXW');
    expect(token1.name).toBe('Pixel Wars');
  });

  test('should fetch token data test 2', async () => {
    jest.setTimeout(10000);
    let path = [
      '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      '0xE5bA47fD94CB645ba4119222e34fB33F59C7CD90',
    ];

    let provider = new providers.JsonRpcProvider(config.JSON_RPC);

    let [token0, token1] = await fetchTokenData(provider, path);

    expect(token0.decimals).toBe(18);
    expect(token0.symbol).toBe('WBNB');
    expect(token0.name).toBe('Wrapped BNB');

    expect(token1.decimals).toBe(5);
    expect(token1.symbol).toBe('SAFUU');
    expect(token1.name).toBe('Safuu');
  });
});
