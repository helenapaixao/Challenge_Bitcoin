<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
  import { inject, onMounted, onUnmounted, reactive } from 'vue';
  import CardCoinItem from './CardCoinItem.vue';
  import type { ICoin } from '~/@types/ICoin';
  import type SimpleService from '~/services/SimpleService';

  const MILI_SEC = 60000 * 5; // 5 minutes

  const simpleService = inject('simpleService') as SimpleService;

  const ids = ['bitcoin', 'ethereum', 'cardano', 'terra-luna-2', 'solana', 'dacxi', 'cosmos'];
  const currencies = ['usd', 'brl'];
  const query = `ids=${ids}&vs_currencies=${currencies}&precision=6`;

  const state = reactive({ coins: [] as ICoin[] });

  const generateUUID = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const fetchCoins = async () => {
    state.coins = [];
    const response = Object.entries(await simpleService.getSimplePrice(query));
    response.forEach((item: [string, any]) => {
      state.coins.push({ id: generateUUID(), name: item[0], currencies: item[1] });
    });
    state.coins.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  };

  const updateCoins = async () => {
    const response = Object.entries(await simpleService.getSimplePrice(query));
    response.sort().forEach((item: [string, any], index) => {
      if (item[0] === state.coins[index].name) {
        state.coins[index] = {
          ...state.coins[index],
          currencies: item[1],
        };
      }
    });
  };

  const updateCoinsPrice = setInterval(updateCoins, MILI_SEC);

  onMounted(async () => {
    await fetchCoins();
  });

  onUnmounted(() => {
    clearInterval(updateCoinsPrice);
  });
</script>

<template>
  <div
    class="mx-auto grid h-[416px] max-w-[1330px] gap-4 overflow-auto px-4 scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-slate-500 scrollbar-thumb-rounded-md sm:grid-cols-2 md:flex md:h-auto md:flex-row md:py-4 md:px-0"
  >
    <CardCoinItem
      v-for="item in state.coins"
      :key="item.id"
      :coin="item"
    />
  </div>
</template>
