import { describe, expect, test } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import CardCoinItem from '~/components/CardCoinItem.vue';
import type { ICoin } from '~/@types/ICoin';

describe('CardCoinItem', () => {
  const cardItem = {
    id: '1234',
    name: 'bitcoin',
    currencies: {
      usd: 1.225413,
      brl: 5.658745,
    },
  };
  const wrapper = shallowMount(CardCoinItem, {
    props: {
      coin: cardItem as ICoin,
    },
  });

  test('should component exist', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should have the currency BRL format', () => {
    expect(wrapper.find('#brlCurrency').text()).toBe('R$ 5,658745');
  });

  test('should have the currency USD format', () => {
    expect(wrapper.find('#usdCurrency').text()).toBe('US$ 1,225413');
  });
});
