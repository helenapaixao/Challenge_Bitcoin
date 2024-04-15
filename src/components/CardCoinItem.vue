<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import { currencyFormatter } from '~/composables/useFormatter';
  import useDialog from '~/composables/useDialog';
  import type { ICoin } from '~/@types/ICoin';
  const { open } = useDialog();

  interface Props {
    coin: ICoin;
  }
  const props = defineProps<Props>();

  const imgUrl = ref();
  watchEffect(async () => {
    imgUrl.value = (await import(/* @vite-ignore */ `../assets/img/${props.coin.name}.png`)).default;
  });

  function handleOpenDialog() {
    open({ component: 'DialogHistoricCoin', props: { id: props.coin.name } });
  }
</script>

<template>
  <div
    id="CardCoinItem"
    class="flex min-w-[240px] flex-1 cursor-pointer flex-col space-y-2 rounded-lg border border-gray-700 px-4 py-3 hover:border-gray-500"
    @click="handleOpenDialog"
  >
    <div class="flex items-center gap-4">
      <img
        class="h-8 w-8"
        :src="imgUrl"
        :alt="`${coin.name} coin`"
        :title="`${coin.name} coin`"
      />
      <h2 class="text-2xl capitalize">{{ coin.name.replaceAll('-', ' ') }}</h2>
    </div>
    <div class="flex flex-col font-bold">
      <div
        id="brlCurrency"
        class="flex gap-8 text-xl md:justify-between"
      >
        R$
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <span :key="coin.currencies.brl">{{ currencyFormatter(coin.currencies.brl.toString(), 'BRL') }}</span>
        </transition>
      </div>

      <div
        id="usdCurrency"
        class="flex gap-8 text-lg md:justify-between"
      >
        US$
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <span :key="coin.currencies.usd">{{ currencyFormatter(coin.currencies.usd.toString(), 'USD') }}</span>
        </transition>
      </div>
      {{}}
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
