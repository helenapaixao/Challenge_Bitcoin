<script lang="ts" setup>
  import { inject, onMounted, onUnmounted, reactive } from 'vue';
  import type CoinsService from '~/services/CoinsService';
  import { currencyFormatter } from '~/composables/useFormatter';
  import type { ICoinMarketList } from '~/@types/ICoinMarketList';

  const coinsService = inject('coinsService') as CoinsService;

  const query = `vs_currency=usd&order=market_cap_desc&per_page=50&page=1`;

  interface ICoinsList {
    id: string;
    marketCapRank: number;
    image: string;
    name: string;
    symbol: string;
    currentPrice: number;
    priceChangePercentage24h: number;
  }

  const MILI_SEC = 60000 * 5; // 5 minutes;

  const state = reactive({
    coins: [] as ICoinsList[],
  });

  const isPositive = (item: number) => item > 0;

  const fetchCoinsList = async () => {
    const response = await coinsService.getCoinsMarketsList(query);
    response.map((item: ICoinMarketList) => {
      state.coins.push({
        id: item.id,
        marketCapRank: item.market_cap_rank,
        image: item.image,
        name: item.name,
        symbol: item.symbol,
        currentPrice: item.current_price,
        priceChangePercentage24h: item.price_change_percentage_24h,
      });
    });
  };

  const updateCoinsList = async () => {
    const response = await coinsService.getCoinsMarketsList(query);
    response.forEach((item: ICoinMarketList, index: number) => {
      if (item.id === state.coins[index].id) {
        state.coins[index] = {
          ...state.coins[index],
          currentPrice: item.current_price,
          priceChangePercentage24h: item.price_change_percentage_24h,
        };
      }
    });
  };

  const updateCoinsListPrice = setInterval(updateCoinsList, MILI_SEC);

  onMounted(async () => {
    await fetchCoinsList();
  });

  onUnmounted(() => {
    clearInterval(updateCoinsListPrice);
  });
</script>

<template>
  <div class="md-py-4 mx-auto max-w-[1330px] px-4 md:py-4 md:px-0">
    <h2 class="bg-green-gradient bg-clip-text py-4 text-display-xs font-bold text-transparent">
      Tabela de preços das criptomoeda
    </h2>
    <div
      class="flex max-h-[520px] min-h-[500px] w-full flex-1 flex-col rounded-md border border-gray-600 p-4 scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-slate-500"
    >
      <div
        class="overflow-auto scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-slate-500 scrollbar-thumb-rounded-md"
      >
        <table class="relative h-full w-full border-collapse">
          <thead class="sticky top-0 bg-background">
            <tr
              class="grid grid-flow-col grid-cols-[_0.1fr,_0.5fr,_0.4fr] border-b border-gray-600 py-4 font-bold md:grid-cols-[80px,repeat(2,minmax(175px,_1fr)),150px]"
            >
              <td></td>
              <td>Moeda</td>
              <td>Preço (US$)</td>
              <td class="hidden text-center md:block">24h (%)</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="coin in state.coins"
              :key="coin.id"
              class="my-4 grid grid-flow-col grid-cols-[_0.1fr,_0.5fr,_0.4fr] items-center md:grid-cols-[80px,repeat(2,minmax(175px,_1fr)),150px]"
            >
              <td>{{ coin.marketCapRank }}</td>
              <td class="flex items-center gap-4">
                <img
                  class="h-6 w-6"
                  :src="coin.image"
                  :alt="coin.name"
                />
                <div>
                  {{ coin.name }}
                  <span class="rounded-md bg-slate-400 px-2 text-xs font-thin uppercase">
                    {{ coin.symbol }}
                  </span>
                </div>
              </td>
              <td class="pr-4 text-right md:pr-0 md:text-left">
                US$
                <transition
                  name="slide-fade"
                  mode="out-in"
                >
                  <span :key="coin.currentPrice">
                    {{ currencyFormatter(coin.currentPrice.toString(), 'USD', 4) }}
                  </span>
                </transition>
              </td>
              <td
                class="hidden text-center md:block"
                :class="[isPositive(coin.priceChangePercentage24h) ? 'text-green-400' : 'text-red-400']"
              >
                <transition
                  name="slide-fade"
                  mode="out-in"
                >
                  <span :key="coin.priceChangePercentage24h"> {{ coin.priceChangePercentage24h.toFixed(4) }} % </span>
                </transition>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>
