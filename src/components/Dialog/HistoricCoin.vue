<script lang="ts" setup>
  import { inject, onMounted, reactive, ref, watch, defineProps } from 'vue';
  import { currencyFormatter } from '~/composables/useFormatter';
  import { shortDateNow } from '~/composables/useDate';
  import { shortTimeNow } from '~/composables/useTime';
  import type CoinsService from '~/services/CoinsService';
  import Loading from '../Loading.vue';

  const coinsService = inject('coinsService') as CoinsService;

  interface Props {
    data: { id: string };
  }
  const props = defineProps<Props>();

  const errorMessage = ref('');

  const state = reactive({
    isLoadingContent: true,
    isValidDateRange: true,
    isLoadingUpdate: false,
    shortDate: shortDateNow(),
    shortTime: shortTimeNow(),
    inputDateSearch: shortDateNow().split('-').reverse().join('-'),
    inputTimeSearch: shortTimeNow(),
    coin: {
      name: '',
      symbol: '',
      image: '',
      currentPriceBrl: 0,
      currentPriceUsd: 0,
    },
  });

  async function findOneCoinHistoricalByDateTime() {
    state.isLoadingContent = true;
    try {
      const coinData = await coinsService.getCoinsHistoricalByDateAndTime(
        props.data.id,
        state.shortDate,
        state.shortTime,
      );

      if (coinData && coinData.name && coinData.symbol && coinData.image && coinData.market_data) {
        const { name, symbol, image, market_data } = coinData;

        state.coin = {
          name,
          symbol,
          image: image.small,
          currentPriceBrl: market_data.current_price.brl,
          currentPriceUsd: market_data.current_price.usd,
        };
      } else {
        throw new Error('Dados da moeda inválidos ou incompletos.');
      }
    } catch (error) {
      console.error('Error fetching coin data:', error);
      errorMessage.value = 'Erro ao buscar dados da moeda.';
    } finally {
      state.isLoadingContent = false;
    }
  }
  async function updateCurrentPrice() {
    state.isValidDateRange = false;
    state.isLoadingUpdate = true;
    try {
      const { market_data } = await coinsService.getCoinsHistoricalByDateAndTime(
        props.data.id,
        state.shortDate,
        state.shortTime,
      );
      state.coin = {
        ...state.coin,
        currentPriceBrl: market_data.current_price.brl,
        currentPriceUsd: market_data.current_price.usd,
      };
      state.isValidDateRange = true;
    } catch (error) {
      console.error('Error updating current price:', error);
      errorMessage.value = 'Erro ao atualizar o preço.';
    } finally {
      state.isLoadingUpdate = false;
    }
  }

  watch(
    () => [state.inputDateSearch, state.inputTimeSearch],
    () => {
      errorMessage.value = '';
      if (!state.inputDateSearch || !state.inputTimeSearch) return;

      const selectedDateTime = new Date(state.inputDateSearch + 'T' + state.inputTimeSearch);
      if (selectedDateTime > new Date()) {
        errorMessage.value = 'Data incorreta! Selecione uma data anterior à data atual.';
        state.isValidDateRange = false;
        state.isLoadingUpdate = false;
        return;
      }
      state.shortDate = state.inputDateSearch.toString().split('-').reverse().join('-');
      state.shortTime = state.inputTimeSearch;
      updateCurrentPrice();
    },
  );

  onMounted(async () => {
    await findOneCoinHistoricalByDateTime();
    state.isLoadingContent = false;
  });
</script>

<template>
  <Loading v-if="state.isLoadingContent || state.isLoadingUpdate" />
  <div
    v-else
    class="flex w-full flex-1 flex-col justify-between gap-4"
  >
    <div class="flex items-center justify-start gap-4">
      <img
        class="h-12 w-12"
        :src="state.coin.image"
        :alt="state.coin.name"
      />
      <div>
        <h2 class="text-2xl">{{ state.coin.name }}</h2>
        <span class="text-xl font-thin">{{ state.coin.symbol }}</span>
      </div>
    </div>

    <div
      v-if="errorMessage"
      class="rounded-lg bg-red-500 py-2 text-white"
    >
      {{ errorMessage }}
    </div>
    <div
      v-else
      class="flex flex-col"
    >
      <div class="flex justify-between text-lg">
        R$ <span>{{ currencyFormatter(state.coin.currentPriceBrl.toString(), 'BRL') }}</span>
      </div>
      <div class="flex justify-between">
        US$ <span>{{ currencyFormatter(state.coin.currentPriceUsd.toString(), 'USD') }}</span>
      </div>
    </div>

    <div class="rounded-lg bg-gray-700 py-2 text-white">
      <input
        v-model="state.inputDateSearch"
        class="w-full appearance-none border-none bg-transparent p-2 outline-none"
        type="date"
      />
      <input
        v-model="state.inputTimeSearch"
        class="w-full appearance-none border-none bg-transparent p-2 outline-none"
        type="time"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
  input[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
</style>
