<script setup lang="ts">
  import TheHeader from '~/components/TheHeader.vue';
  import CardCoinList from '~/components/CardCoinList.vue';
  import TableListMarketCap from '~/components/TableListMarketCap.vue';
  import TheFooter from '~/components/TheFooter.vue';
</script>

<template>
  <main class="h-screen w-full overflow-auto bg-background pt-8 pb-4 text-white md:px-8">
    <TheHeader />
    <CardCoinList />
    <TableListMarketCap />
    <TheFooter />
  </main>
</template>
